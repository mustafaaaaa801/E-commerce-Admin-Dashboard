import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "أحمد محمد",
      position: "رئيس مجلس الإدارة",
      bio: "خبرة 20 عاماً في مجال الحفاظ على التراث الثقافي والعمل الخيري",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "سارة خالد",
      position: "نائب الرئيس",
      bio: "متخصصة في تطوير البرامج التنموية والإدارة المالية للمؤسسات غير الربحية",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      name: "محمد عبد الله",
      position: "المدير التنفيذي",
      bio: "خبرة 15 عاماً في إدارة المؤسسات غير الربحية وتنفيذ المشاريع التنموية",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 4,
      name: "نورا سعيد",
      position: "مديرة العلاقات العامة",
      bio: "خبرة في التواصل الاجتماعي والعلاقات العامة وتنظيم الفعاليات",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 5,
      name: "خالد عمر",
      position: "مدير برنامج الحفاظ على التراث",
      bio: "خبير في ترميم المباني التاريخية وإدارة المشاريع التراثية",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 6,
      name: "ليلى كريم",
      position: "مديرة برنامج دعم الجرحى",
      bio: "خبرة في المجال الطبي والنفسي وإدارة برامج الدعم النفسي والصحي",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    }
  ];

  const achievements = [
    {
      year: "2023",
      title: "ترميم 5 مباني تراثية",
      description: "تم ترميم خمسة مباني تاريخية بما يتوافق مع الطابع المعماري الأصلي."
    },
    {
      year: "2022",
      title: "دعم 500 جريح",
      description: "قدمنا الدعم المالي والصحي والنفسي لأكثر من 500 جريح ومصاب."
    },
    {
      year: "2021",
      title: "إطلاق 10 مشاريع تنموية",
      description: "أطلقنا عشرة مشاريع تنموية ساهمت في تحسين الظروف الاقتصادية والاجتماعية."
    },
    {
      year: "2020",
      title: "تأسيس المكتبة التراثية",
      description: "أسسنا مكتبة تراثية تضم آلاف الوثائق والصور والتسجيلات التاريخية."
    },
    {
      year: "2019",
      title: "إطلاق برنامج التطوع",
      description: "أطلقنا برنامج التطوع الذي استقطب أكثر من 1000 متطوع."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/10 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">من نحن</h1>
          <p className="text-xl text-gray-700 mb-6">
            جمعية التراث الثقافي هي مؤسسة غير ربحية تأسست عام 2018 بهدف الحفاظ على التراث الثقافي والتاريخي، ودعم الجرحى والمصابين، وتمويل المشاريع التنموية.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <i className="fas fa-eye text-primary text-2xl"></i>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">رؤيتنا</h2>
              <p className="text-gray-600 text-center">
                نسعى لأن نكون المؤسسة الرائدة في مجال الحفاظ على التراث الثقافي ودعم الجرحى وتمويل المشاريع التنموية، وأن نساهم في بناء مجتمع واع بأهمية تراثه وملتزم بمساعدة المحتاجين.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <i className="fas fa-bullseye text-primary text-2xl"></i>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">رسالتنا</h2>
              <p className="text-gray-600 text-center">
                نعمل على الحفاظ على التراث الثقافي والتاريخي، ودعم الجرحى والمصابين، وتمويل المشاريع التنموية من خلال برامج وأنشطة متنوعة تستهدف مختلف شرائح المجتمع وتشجع على المشاركة المجتمعية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">أهدافنا</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <i className="fas fa-landmark text-primary text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">حماية التراث</h3>
              <p className="text-gray-600 text-center">
                حماية المواقع التراثية وصيانتها والحفاظ على القيم الثقافية والتاريخية للمجتمع.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <i className="fas fa-hand-holding-heart text-primary text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">دعم الجرحى</h3>
              <p className="text-gray-600 text-center">
                تقديم الرعاية والدعم المالي والنفسي والصحي للجرحى والمصابين ومساعدتهم على تجاوز محنهم.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <i className="fas fa-chart-line text-primary text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">التنمية المجتمعية</h3>
              <p className="text-gray-600 text-center">
                تمويل المبادرات الاقتصادية والاجتماعية لتنمية المجتمع وتحسين الظروف المعيشية للأفراد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">فريقنا</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">إنجازاتنا</h2>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
                <TabsTrigger value="2022">2022</TabsTrigger>
                <TabsTrigger value="2021">2021</TabsTrigger>
                <TabsTrigger value="2020">2020</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-start">
                      <div className="bg-primary text-white px-3 py-1 rounded text-sm font-bold mr-4">
                        {achievement.year}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              {["2023", "2022", "2021", "2020", "2019"].map((year) => (
                <TabsContent key={year} value={year} className="space-y-4">
                  {achievements
                    .filter((a) => a.year === year)
                    .map((achievement, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-start">
                          <div className="bg-primary text-white px-3 py-1 rounded text-sm font-bold mr-4">
                            {achievement.year}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                            <p className="text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}