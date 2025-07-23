import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getLibraryItems } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface LibraryItem {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string | null;
  file_url: string | null;
  created_at: string;
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LibraryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLibraryItems = async () => {
      try {
        setIsLoading(true);
        const data = await getLibraryItems();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching library items:", error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "تعذر تحميل محتويات المكتبة، يرجى المحاولة مرة أخرى لاحقاً.",
          variant: "destructive",
        });
        // Use placeholder data if API fails
        const placeholderItems = [
          {
            id: 1,
            title: "مخطوطة نوادر الحكم",
            description: "مخطوطة نادرة تعود للقرن السادس عشر تحتوي على مجموعة من الحكم والأمثال",
            type: "manuscript",
            image: "/images/manuscript.jpg",
            file_url: null,
            created_at: "2023-01-01T00:00:00Z"
          },
          {
            id: 2,
            title: "كتاب تاريخ الفن العربي",
            description: "كتاب شامل يتناول تاريخ الفن العربي عبر العصور المختلفة",
            type: "book",
            image: "/images/ArabArtHistory.jpg",
            file_url: null,
            created_at: "2023-01-02T00:00:00Z"
          },
          {
            id: 3,
            title: "صور نادرة للمدينة القديمة",
            description: "مجموعة صور فوتوغرافية نادرة تعود للخمسينيات والستينيات",
            type: "photo",
            image: "/images/OldCity.jpg",
            file_url: null,
            created_at: "2023-01-03T00:00:00Z"
          },
          {
            id: 4,
            title: "تسجيل صوتي للأغاني الشعبية",
            description: "مجموعة من التسجيلات الصوتية النادرة للأغاني الشعبية التقليدية",
            type: "audio",
            image: "/images/TraditionalMusic.jpg",
            file_url: null,
            created_at: "2023-01-04T00:00:00Z"
          }
        ];
        setItems(placeholderItems);
        setFilteredItems(placeholderItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraryItems();
  }, [toast]);

  useEffect(() => {
    const filtered = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const filterItemsByType = (type: string) => {
    if (type === "all") {
      return filteredItems;
    }
    return filteredItems.filter(item => item.type === type);
  };

  const renderLibraryItems = (items: LibraryItem[]) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد عناصر متاحة في هذه الفئة</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <Card key={item.id} className="overflow-hidden h-full">
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
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
                {item.type === "manuscript" && "مخطوطة"}
                {item.type === "book" && "كتاب"}
                {item.type === "photo" && "صورة"}
                {item.type === "audio" && "تسجيل صوتي"}
                {item.type === "video" && "فيديو"}
                {!["manuscript", "book", "photo", "audio", "video"].includes(item.type) && item.type}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-end">
                {item.file_url ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.file_url} target="_blank" rel="noreferrer">
                      عرض المحتوى
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    طلب عرض
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-4">المكتبة الرقمية</h1>
        <p className="text-gray-600">
          مجموعة من المخطوطات والكتب والصور والتسجيلات الصوتية النادرة والقيمة من تراثنا الثقافي
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-10">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <Input
            placeholder="البحث في المكتبة..."
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
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="manuscript">المخطوطات</TabsTrigger>
              <TabsTrigger value="book">الكتب</TabsTrigger>
              <TabsTrigger value="photo">الصور</TabsTrigger>
              <TabsTrigger value="audio">التسجيلات الصوتية</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {renderLibraryItems(filteredItems)}
          </TabsContent>

          <TabsContent value="manuscript">
            {renderLibraryItems(filterItemsByType("manuscript"))}
          </TabsContent>

          <TabsContent value="book">
            {renderLibraryItems(filterItemsByType("book"))}
          </TabsContent>

          <TabsContent value="photo">
            {renderLibraryItems(filterItemsByType("photo"))}
          </TabsContent>

          <TabsContent value="audio">
            {renderLibraryItems(filterItemsByType("audio"))}
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-16 p-6 bg-gray-50 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">هل لديك مادة تراثية قيمة؟</h2>
          <p className="mb-6 text-gray-600">
            نرحب بالمساهمات في إثراء مكتبتنا الرقمية من خلال التبرع بالمخطوطات أو الكتب أو الصور أو التسجيلات النادرة
          </p>
          <Button size="lg">
            تبرع بمواد للمكتبة
          </Button>
        </div>
      </div>
    </div>
  );
}