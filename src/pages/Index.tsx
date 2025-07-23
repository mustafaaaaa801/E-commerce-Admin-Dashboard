import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Using relative paths for images
const heritageImg = "/assets/heritage.jpg";
const supportImg = "/assets/support.jpg";
const developmentImg = "/assets/development.jpg";

export default function HomePage() {
  const [donationAmount, setDonationAmount] = useState<number>(100);
  
  const programs = [
    {
      id: 1,
      title: "برنامج الحفاظ على التراث",
      description: "يهدف هذا البرنامج إلى حماية المواقع التراثية وترميمها والحفاظ على القيم الثقافية والتاريخية.",
      image: heritageImg,
      link: "/programs#heritage",
    },
    {
      id: 2,
      title: "برنامج دعم الجرحى",
      description: "يقدم برنامجنا الدعم المالي والصحي والنفسي للجرحى والمصابين لمساعدتهم على تجاوز محنهم.",
      image: supportImg,
      link: "/programs#support",
    },
    {
      id: 3,
      title: "برنامج التنمية الاقتصادية",
      description: "نعمل على تمويل المشاريع التنموية التي تسهم في تحسين الظروف الاقتصادية والاجتماعية للمجتمع.",
      image: developmentImg,
      link: "/programs#development",
    },
  ];

  const news = [
    {
      id: 1,
      title: "ترميم قصر تاريخي",
      date: "10 يوليو 2023",
      excerpt: "تم الانتهاء من ترميم القصر التاريخي بمدينة ...",
      category: "تراث",
    },
    {
      id: 2,
      title: "فعالية خيرية لدعم الجرحى",
      date: "5 يوليو 2023",
      excerpt: "نظمت الجمعية فعالية خيرية لجمع التبرعات لدعم الجرحى...",
      category: "فعاليات",
    },
    {
      id: 3,
      title: "إطلاق مشروع تنموي جديد",
      date: "1 يوليو 2023",
      excerpt: "أعلنت الجمعية عن إطلاق مشروع تنموي جديد يهدف إلى...",
      category: "تنمية",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-24 px-4 text-white text-center">
        <div className="container mx-auto max-w-4xl fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">جمعية التراث الثقافي</h1>
          <p className="text-xl mb-8">نعمل على الحفاظ على التراث الثقافي والتاريخي، ودعم الجرحى، وتمويل المشاريع التنموية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button size="lg" className="text-lg px-6">تبرع الآن</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-lg px-6 bg-white/10 backdrop-blur-sm">تعرف علينا</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Donate Section */}
      <section className="bg-primary/10 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">تبرع سريع</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[50, 100, 200, 500].map((amount) => (
                  <Button 
                    key={amount}
                    variant={donationAmount === amount ? "default" : "outline"}
                    onClick={() => setDonationAmount(amount)}
                    className="text-lg"
                  >
                    {amount} ريال
                  </Button>
                ))}
              </div>
              <Link to={`/donate?amount=${donationAmount}`} className="w-full">
                <Button className="w-full text-lg" size="lg">
                  تبرع الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">برامجنا</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">نعمل من خلال ثلاثة برامج رئيسية لتحقيق أهداف الجمعية والوصول إلى رؤيتنا المستقبلية</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={program.image || `https://via.placeholder.com/400x200?text=${program.title}`} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <Link to={program.link} className="text-primary font-medium hover:underline">
                    المزيد من التفاصيل
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أخبار وفعاليات</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">آخر الأخبار والفعاليات من جمعيتنا</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="heritage">تراث</TabsTrigger>
                <TabsTrigger value="events">فعاليات</TabsTrigger>
                <TabsTrigger value="development">تنمية</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {news.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{item.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                      <p className="text-gray-600">{item.excerpt}</p>
                      <Link to="/news" className="text-primary font-medium hover:underline block mt-4">
                        اقرأ المزيد
                      </Link>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center mt-8">
                  <Link to="/news">
                    <Button variant="outline">عرض كل الأخبار والفعاليات</Button>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="heritage" className="space-y-4">
                {news.filter(n => n.category === 'تراث').map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{item.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                      <p className="text-gray-600">{item.excerpt}</p>
                      <Link to="/news" className="text-primary font-medium hover:underline block mt-4">
                        اقرأ المزيد
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="events" className="space-y-4">
                {news.filter(n => n.category === 'فعاليات').map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{item.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                      <p className="text-gray-600">{item.excerpt}</p>
                      <Link to="/news" className="text-primary font-medium hover:underline block mt-4">
                        اقرأ المزيد
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="development" className="space-y-4">
                {news.filter(n => n.category === 'تنمية').map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{item.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                      <p className="text-gray-600">{item.excerpt}</p>
                      <Link to="/news" className="text-primary font-medium hover:underline block mt-4">
                        اقرأ المزيد
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">ساهم معنا في إحداث التغيير</h2>
          <p className="text-lg mb-8">انضم إلى جهودنا للحفاظ على التراث، ودعم المحتاجين، وتمويل المشاريع التنموية. كل مساهمة صغيرة تصنع فرقًا كبيرًا.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button size="lg" className="text-lg px-6">تبرع الآن</Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="outline" size="lg" className="text-lg px-6">انضم كمتطوع</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}