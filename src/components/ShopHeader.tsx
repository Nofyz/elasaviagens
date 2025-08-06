import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  MapPin, Menu, X, User, Heart, Search, ShoppingBag,
  LogIn, UserPlus, Settings, HelpCircle, LogOut
} from 'lucide-react';
import logoImg from '@assets/logo-elasa_1754170413021.png';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFavorites } from '@/hooks/useFavorites';

const ShopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context
  const { favorites, getFavoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: '/', label: 'Início' },
    { href: '/loja', label: 'Destinos' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/sobre', label: 'Contato', scrollTo: 'contato' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={logoImg} 
              alt="Elasa Viagens e Turismo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link, index) => (
              link.scrollTo ? (
                <button
                  key={`${link.label}-${index}`}
                  onClick={() => {
                    window.location.href = link.href;
                    setTimeout(() => {
                      const element = document.getElementById(link.scrollTo);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link 
                  key={`${link.href}-${index}`}
                  to={link.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/loja?filter=favoritos">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative">
                <Heart className="h-4 w-4" />
                {getFavoritesCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getFavoritesCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  {isLoggedIn ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        U
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuLabel>Bem-vindo!</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Entrar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Criar Conta</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Ajuda</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favoritos</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Ajuda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-1">
              {navigationLinks.map((link, index) => (
                link.scrollTo ? (
                  <button
                    key={`mobile-${link.label}-${index}`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = link.href;
                      setTimeout(() => {
                        const element = document.getElementById(link.scrollTo);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={`mobile-${link.href}-${index}`}
                    to={link.href}
                    className="block px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <div className="px-4 pt-4 border-t border-border space-y-2">
                <Link to="/loja?filter=favoritos" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 relative">
                    <Heart className="h-4 w-4 mr-2" />
                    Favoritos
                    {getFavoritesCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getFavoritesCount()}
                      </span>
                    )}
                  </Button>
                </Link>
                
                {!isLoggedIn ? (
                  <>
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-blue-500 to-teal-600 text-white hover:from-blue-600 hover:to-teal-700 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Criar Conta
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ShopHeader;