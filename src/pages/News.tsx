import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getNews } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string | null;
  category: string;
  publish_date: string;
  url: string | null;
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data = await getNews();
        setNewsItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "تعذر تحميل الأخبار، يرجى المحاولة مرة أخرى لاحقاً.",
          variant: "destructive",
        });
        // Use placeholder data if API fails
        const placeholderItems = [
          {
            id: 1,
            title: "معرض التراث الثقافي العربي",
            content: "تنظم الجمعية معرضاً للتراث الثقافي العربي يضم مجموعة من المقتنيات النادرة والقطع الأثرية والمخطوطات...",
            image: "/images/culturalheritage.jpg",
            category: "فعاليات",
            publish_date: "2023-07-15T00:00:00Z",
            url: null
          },
          {
            id: 2,
            title: "ورشة عمل حول رقمنة المخطوطات",
            content: "تقيم الجمعية ورشة عمل متخصصة حول أساليب وتقنيات رقمنة المخطوطات والوثائق التاريخية وحفظها...",
            image: "/images/DigitizationWorkshop.jpg",
            category: "ورش عمل",
            publish_date: "2023-07-10T00:00:00Z",
            url: null
          },
          {
            id: 3,
            title: "إطلاق مشروع توثيق الحرف اليدوية التقليدية",
            content: "أطلقت الجمعية مشروعاً جديداً لتوثيق الحرف اليدوية التقليدية في المنطقة العربية بهدف الحفاظ على هذا التراث الثقافي غير المادي...",
            image: "/images/TraditionalCrafts.jpg",
            category: "مشاريع",
            publish_date: "2023-07-01T00:00:00Z",
            url: null
          }
        ];
        setNewsItems(placeholderItems);
        setFilteredItems(placeholderItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [toast]);

  useEffect(() => {
    const filtered = newsItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, newsItems]);

  const filterItemsByCategory = (category: string) => {
    if (category === "all") {
      return filteredItems;
    }
    return filteredItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  const renderNewsItems = (items: NewsItem[]) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد أخبار متاحة في هذه الفئة</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="m21 15-5-5L5 21"></path>
                  </svg>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge>{item.category}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-2">{formatDate(item.publish_date)}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
              <div className="flex justify-end">
                {item.url ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      قراءة المزيد
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    قراءة المزيد
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Extract unique categories from news items
  const categories = ["all", ...new Set(newsItems.map(item => item.category.toLowerCase()))];

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-4">الأخبار والفعاليات</h1>
        <p className="text-gray-600">
          آخر أخبار وفعاليات الجمعية والأنشطة الثقافية المختلفة
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-10">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <Input
            placeholder="البحث في الأخبار..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="فعاليات">فعاليات</TabsTrigger>
              <TabsTrigger value="مشاريع">مشاريع</TabsTrigger>
              <TabsTrigger value="ورش عمل">ورش عمل</TabsTrigger>
              <TabsTrigger value="إعلانات">إعلانات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {renderNewsItems(filteredItems)}
          </TabsContent>

          <TabsContent value="فعاليات">
            {renderNewsItems(filterItemsByCategory("فعاليات"))}
          </TabsContent>

          <TabsContent value="مشاريع">
            {renderNewsItems(filterItemsByCategory("مشاريع"))}
          </TabsContent>

          <TabsContent value="ورش عمل">
            {renderNewsItems(filterItemsByCategory("ورش عمل"))}
          </TabsContent>

          <TabsContent value="إعلانات">
            {renderNewsItems(filterItemsByCategory("إعلانات"))}
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-16 text-center">
        <Button size="lg">
          عرض المزيد من الأخبار
        </Button>
      </div>
    </div>
  );
}