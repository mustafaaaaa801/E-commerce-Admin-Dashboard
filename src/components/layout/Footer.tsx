import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">جمعية التراث الثقافي</h3>
            <p className="text-gray-300 mb-4">
              نعمل على الحفاظ على التراث الثقافي والتاريخي، ودعم الجرحى والمصابين، وتمويل المشاريع التنموية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">الرئيسية</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">من نحن</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-white">البرامج والمشاريع</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white">أخبار وفعاليات</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">المزيد</h3>
            <ul className="space-y-2">
              <li><Link to="/library" className="text-gray-300 hover:text-white">المكتبة التراثية</Link></li>
              <li><Link to="/volunteer" className="text-gray-300 hover:text-white">التطوع</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-white">تبرع</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">اتصل بنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 ml-2 text-primary"></i>
                <span>المدينة، الشارع، البناية</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 ml-2 text-primary"></i>
                <span>+123 456 789</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 ml-2 text-primary"></i>
                <span>info@heritage-association.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} جمعية التراث الثقافي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}