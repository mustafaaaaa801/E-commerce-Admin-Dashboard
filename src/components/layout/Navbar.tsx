import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "البرامج والمشاريع", href: "/programs" },
  { name: "أخبار وفعاليات", href: "/news" },
  { name: "المكتبة التراثية", href: "/library" },
  { name: "التطوع", href: "/volunteer" },
  { name: "اتصل بنا", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex lg:mr-6">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">جمعية التراث الثقافي</span>
          </Link>
        </div>
        
        <div className="flex-1" />
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-4 lg:space-x-reverse">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex lg:items-center lg:space-x-4 lg:space-x-reverse mr-4">
          <Link to="/donate">
            <Button variant="default" size="sm">تبرع الآن</Button>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden mr-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <i className={cn("fas", isOpen ? "fa-times" : "fa-bars")} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="lg:hidden">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link 
                  to="/donate" 
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="default" className="w-full">تبرع الآن</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}