import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { submitDonation } from "@/lib/api";

export default function DonatePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 100,
    payment_method: "بطاقة ائتمان",
    message: "",
    is_monthly: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, payment_method: value }));
  };

  const handleMonthlyToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_monthly: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitDonation({
        ...formData,
        amount: Number(formData.amount)
      });
      
      toast({
        title: "شكراً لدعمكم!",
        description: response.message || "تم تسجيل تبرعك بنجاح، شكراً لدعمكم",
      });
      
      setFormData({
        name: "",
        email: "",
        amount: 100,
        payment_method: "بطاقة ائتمان",
        message: "",
        is_monthly: false
      });
    } catch (error) {
      toast({
        title: "خطأ!",
        description: "حدث خطأ أثناء تسجيل التبرع، يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
      console.error("Error submitting donation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">تبرع الآن</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تبرعاتكم تساعدنا في الحفاظ على التراث الثقافي وإحياء الهوية العربية من خلال مشاريعنا وبرامجنا المختلفة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>تبرع الآن</CardTitle>
              <CardDescription>اختر قيمة التبرع وطريقة الدفع</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">قيمة التبرع</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[50, 100, 250, 500].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={formData.amount === amount ? "default" : "outline"}
                        onClick={() => handleAmountChange(amount)}
                        className="text-lg"
                      >
                        {amount} ر.س
                      </Button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input
                      id="custom-amount"
                      name="amount"
                      type="number"
                      min="1"
                      placeholder="مبلغ آخر"
                      value={formData.amount}
                      onChange={handleChange}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="monthly-donation"
                    checked={formData.is_monthly}
                    onCheckedChange={handleMonthlyToggle}
                  />
                  <Label htmlFor="monthly-donation">تبرع شهري</Label>
                </div>

                <div className="space-y-2">
                  <Label>طريقة الدفع</Label>
                  <RadioGroup 
                    value={formData.payment_method} 
                    onValueChange={handlePaymentMethodChange}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="بطاقة ائتمان" id="payment-card" className="peer sr-only" />
                      <Label
                        htmlFor="payment-card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                          <line x1="2" x2="22" y1="10" y2="10"></line>
                        </svg>
                        بطاقة ائتمان
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="تحويل بنكي" id="payment-transfer" className="peer sr-only" />
                      <Label
                        htmlFor="payment-transfer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                          <path d="M18 6V4c0-1-1-2-2-2H4C3 2 2 3 2 4v16c0 1 1 2 2 2h12c1 0 2-1 2-2v-2"></path>
                          <path d="M22 12H10m0 0 4-4m-4 4 4 4"></path>
                        </svg>
                        تحويل بنكي
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="الاسم الكامل" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="example@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">رسالة (اختياري)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="أضف رسالة مع تبرعك..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "جاري المعالجة..." : "تبرع الآن"}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  جميع المعاملات آمنة ومشفرة. بالتبرع فإنك توافق على الشروط والأحكام.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>أين تذهب تبرعاتكم؟</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="m5 12 5 5 10-10"></path>
                      </svg>
                    </div>
                    <span>ترميم المواقع التراثية والتاريخية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="m5 12 5 5 10-10"></path>
                      </svg>
                    </div>
                    <span>رقمنة المخطوطات والكتب التراثية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="m5 12 5 5 10-10"></path>
                      </svg>
                    </div>
                    <span>برامج تعليمية للأطفال والشباب</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="m5 12 5 5 10-10"></path>
                      </svg>
                    </div>
                    <span>معارض وفعاليات ثقافية</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>طرق أخرى للدعم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    تبرع بالأعمال التطوعية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                      <path d="M16.5 9.4 7.55 4.24"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" x2="12" y1="22" y2="12"></line>
                      <circle cx="18.5" cy="15.5" r="2.5"></circle>
                      <path d="M20.27 17.27 22 19"></path>
                    </svg>
                    تبرع بالكتب والمخطوطات
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" x2="22" y1="12" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    انشر الوعي على مواقع التواصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}