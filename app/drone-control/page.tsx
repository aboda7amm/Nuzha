"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Battery, Radio, AlertTriangle, MapPin, Camera, Clock, User, Phone, FileText, X, Thermometer, Droplets, Users, Locate, ZoomIn, ZoomOut, Maximize2, Brain, CheckCircle2, AlertCircle } from "lucide-react"

// أنواع البيانات
interface AIRecommendation {
  action: string
  priority: "high" | "medium" | "low"
  description: string
}

interface Violation {
  id: string
  type: string
  description: string
  location: [number, number]
  time: string
  image: string
  severity: "high" | "medium" | "low"
  aiDetected: boolean
  aiConfidence: number
  aiRecommendations: AIRecommendation[]
}

interface Drone {
  id: string
  name: string
  location: [number, number]
  battery: number
  status: "active" | "idle" | "charging"
  violations: Violation[]
  temperature: number
  visitorCount: number
  humidity: number
}

interface Report {
  id: string
  reporterName: string
  reporterPhone: string
  description: string
  location: [number, number]
  time: string
  status: "new" | "in-progress" | "resolved"
  image?: string
  aiRecommendations?: AIRecommendation[]
}

export default function DroneControlPage() {
  const router = useRouter()
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showViolationModal, setShowViolationModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [hoveredDrone, setHoveredDrone] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isTrackingLocation, setIsTrackingLocation] = useState(false)
  const [watchId, setWatchId] = useState<number | null>(null)

  // التحقق من صلاحية الوصول
  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "environmental-security") {
      router.push("/")
    }
    
    // تحميل آخر موقع محفوظ
    const savedLocation = localStorage.getItem("lastUserLocation")
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation)
        setUserLocation(location)
      } catch (e) {
        console.error("Error parsing saved location:", e)
      }
    }
  }, [router])
  
  // تنظيف متابعة الموقع عند إغلاق الصفحة
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  // بيانات وهمية للدرونز - المواقع حسب الدوائر السوداء المحددة
  const drones: Drone[] = [
    {
      id: "D1",
      name: "درون 1 - محمية الجبيل للأحياء البحرية",
      location: [26.8, 47.0], // الدائرة العلوية (الجبيل)
      battery: 85,
      status: "active",
      temperature: 32,
      visitorCount: 45,
      humidity: 25,
      violations: [
        {
          id: "V1",
          type: "صيد غير قانوني",
          description: "تم رصد مركبة مشبوهة مع أشخاص يحملون أسلحة صيد",
          location: [26.82, 47.02],
          time: "2025-12-05 14:30",
          image: "/violation-hunting.jpg",
          severity: "high",
          aiDetected: true,
          aiConfidence: 94,
          aiRecommendations: [
            {
              action: "التوجه الفوري للموقع - إحداثيات 26.82, 47.02",
              priority: "high",
              description: "اكتشاف مجموعة مسلحة بأدوات صيد في منطقة محظورة. يُنصح بالتنسيق مع الدعم الأمني قبل الاقتراب"
            },
            {
              action: "ضبط المخالفين وحجز الأسلحة والمعدات",
              priority: "high",
              description: "تطبيق المادة 15 من نظام البيئة - غرامة تصل إلى 30 مليون ريال للصيد في المحميات"
            },
            {
              action: "إبلاغ مركز العمليات والمركز الوطني لتنمية الحياة الفطرية",
              priority: "medium",
              description: "توثيق الحالة في النظام المركزي وإصدار محضر الضبط الإلكتروني"
            }
          ]
        }
      ]
    },
    {
      id: "D2",
      name: "درون 2 - محمية سجا وأم الرمث",
      location: [21.5, 40.0], // الدائرة اليسرى (سجا)
      battery: 92,
      status: "active",
      temperature: 28,
      visitorCount: 120,
      humidity: 35,
      violations: [
        {
          id: "V3",
          type: "قطع أشجار غير مصرح",
          description: "رصد مجموعة تقوم بقطع أشجار السنط في منطقة محمية",
          location: [21.52, 40.02],
          time: "2025-12-05 15:45",
          image: "/violation-trees.jpg",
          severity: "high",
          aiDetected: true,
          aiConfidence: 91,
          aiRecommendations: [
            {
              action: "إيقاف عملية القطع فوراً - موقع 21.52, 40.02",
              priority: "high",
              description: "رصد 4 أشخاص يقطعون أشجار السنط بمعدات كهربائية. التدخل الفوري ضروري لمنع مزيد من الأضرار"
            },
            {
              action: "ضبط المخالفين وحجز المعدات والمركبات",
              priority: "high",
              description: "غرامة تصل إلى 20 مليون ريال لقطع الأشجار في المحميات (المادة 13 من نظام البيئة)"
            },
            {
              action: "تقييم الأضرار البيئية وإصدار محضر مفصل",
              priority: "medium",
              description: "تصوير الموقع وحصر عدد الأشجار المتضررة للمطالبة بالتعويضات"
            }
          ]
        }
      ]
    },
    {
      id: "D3",
      name: "درون 3 - محمية عروق بني معارض",
      location: [19.2, 46.5], // الدائرة الوسطى (عروق بني معارض)
      battery: 78,
      status: "active",
      temperature: 29,
      visitorCount: 95,
      humidity: 65,
      violations: []
    },
    {
      id: "D4",
      name: "درون 4 - محمية جزر فرسان",
      location: [16.7, 39.5], // الدائرة السفلى (جزر فرسان)
      battery: 88,
      status: "active",
      temperature: 24,
      visitorCount: 62,
      humidity: 45,
      violations: []
    }
  ]

  // بيانات وهمية للبلاغات مع توصيات الذكاء الاصطناعي
  const reports: Report[] = [
    {
      id: "R1",
      reporterName: "أحمد محمد",
      reporterPhone: "0501234567",
      description: "سماع أصوات إطلاق نار في محمية الجبيل البحرية",
      location: [26.85, 47.05],
      time: "2025-12-05 13:00",
      status: "new",
      aiRecommendations: [
        {
          action: "توجيه درون 1 للتحقق الفوري من البلاغ",
          priority: "high",
          description: "بلاغ مواطن عن إطلاق نار في 26.85, 47.05. الطائرة على بعد 2.3 كم من الموقع - وقت الوصول المتوقع 3 دقائق"
        },
        {
          action: "تنبيه الدورية البرية الأقرب للاستعداد",
          priority: "high",
          description: "إطلاق نار في محمية بحرية يحتمل صيد غير قانوني. يُنصح بالتنسيق مع حرس الحدود"
        },
        {
          action: "الاتصال بالمبلغ للحصول على تفاصيل إضافية",
          priority: "medium",
          description: "التواصل مع أحمد محمد (0501234567) لتحديد عدد الأشخاص ونوع الأسلحة"
        }
      ]
    },
    {
      id: "R2",
      reporterName: "فاطمة علي",
      reporterPhone: "0559876543",
      description: "مشاهدة رعي جائر للماشية في محمية سجا وأم الرمث",
      location: [21.55, 40.05],
      time: "2025-12-05 11:30",
      status: "in-progress",
      aiRecommendations: [
        {
          action: "التحقق من هوية الرعاة وفحص التصاريح",
          priority: "high",
          description: "التوجه للموقع 21.55, 40.05 والتحقق من تصاريح الرعي عبر نظام بلدي. الرعي ممنوع في هذه المنطقة"
        },
        {
          action: "إبعاد الماشية وتغريم المخالف",
          priority: "high",
          description: "غرامة 10,000 ريال للرعي الجائر في المحميات (المادة 16). حجز الماشية حتى سداد الغرامة"
        },
        {
          action: "توثيق المخالفة وإحالة المبلغة للمتابعة",
          priority: "medium",
          description: "شكر فاطمة علي (0559876543) على البلاغ وإبلاغها بنتيجة المتابعة"
        }
      ]
    },
    {
      id: "R3",
      reporterName: "خالد سعيد",
      reporterPhone: "0551112233",
      description: "تلوث بحري بمخلفات بلاستيكية في جزر فرسان",
      location: [16.75, 39.55],
      time: "2025-12-04 16:20",
      status: "resolved",
      aiRecommendations: [
        {
          action: "تم تنفيذ عملية التنظيف بنجاح ✓",
          priority: "low",
          description: "تم إرسال فريق التنظيف وجمع 120 كجم من المخلفات البلاستيكية. تم شكر المبلغ وإغلاق البلاغ"
        },
        {
          action: "تفعيل المراقبة الدورية للمنطقة",
          priority: "low",
          description: "جدولة دورية برية للمنطقة كل 3 أيام لمنع تكرار التلوث"
        }
      ]
    }
  ]

  const handleDroneClick = (drone: Drone) => {
    setSelectedDrone(drone)
    if (drone.violations.length > 0) {
      setShowViolationModal(true)
    }
  }

  const handleReportClick = (report: Report) => {
    setSelectedReport(report)
    setShowReportModal(true)
  }

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم خدمات تحديد الموقع")
      return
    }
    
    if (isTrackingLocation) {
      // إيقاف التتبع
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
        setWatchId(null)
      }
      setIsTrackingLocation(false)
    } else {
      // بدء التتبع
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude]
          setUserLocation(location)
          // حفظ الموقع في localStorage
          localStorage.setItem("lastUserLocation", JSON.stringify(location))
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("لم نتمكن من تحديد موقعك. تأكد من تفعيل خدمات الموقع.")
          setIsTrackingLocation(false)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      )
      setWatchId(id)
      setIsTrackingLocation(true)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-orange-600 bg-orange-100"
      case "low": return "text-yellow-600 bg-yellow-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "text-red-600 bg-red-100"
      case "in-progress": return "text-blue-600 bg-blue-100"
      case "resolved": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "جديد"
      case "in-progress": return "قيد المعالجة"
      case "resolved": return "تم الحل"
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200"
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200"
      case "low": return "text-blue-600 bg-blue-50 border-blue-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "عاجل"
      case "medium": return "متوسط"
      case "low": return "عادي"
      default: return priority
    }
  }

  // تحويل الإحداثيات الجغرافية إلى نسب مئوية على الخريطة
  const getPositionOnMap = (lat: number, lng: number) => {
    // حدود السعودية الدقيقة على الخريطة
    const minLat = 16.0
    const maxLat = 32.0
    const minLng = 34.5
    const maxLng = 55.5
    
    // حساب النسبة المئوية مع هامش أمان
    const marginX = 10
    const marginY = 10
    const usableWidth = 100 - (marginX * 2)
    const usableHeight = 100 - (marginY * 2)
    
    const x = marginX + ((lng - minLng) / (maxLng - minLng)) * usableWidth
    const y = marginY + ((maxLat - lat) / (maxLat - minLat)) * usableHeight
    
    return { x, y }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">لوحة التحكم - الأمن البيئي</h1>
              <p className="text-sm opacity-90">مراقبة الطائرات المسيرة والمخالفات البيئية</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-lg">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-semibold">AI نشط</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="text-sm">متصل</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطائرات</p>
                <p className="text-3xl font-bold text-primary">{drones.length}</p>
              </div>
              <Camera className="w-10 h-10 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الطائرات النشطة</p>
                <p className="text-3xl font-bold text-green-600">
                  {drones.filter(d => d.status === "active").length}
                </p>
              </div>
              <Radio className="w-10 h-10 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المخالفات المكتشفة</p>
                <p className="text-3xl font-bold text-red-600">
                  {drones.reduce((acc, d) => acc + d.violations.length, 0)}
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-md border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">بلاغات المواطنين</p>
                <p className="text-3xl font-bold text-blue-600">{reports.length}</p>
              </div>
              <FileText className="w-10 h-10 text-blue-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drones List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Camera className="w-6 h-6" />
              الطائرات المسيرة
            </h2>
            {drones.map((drone) => (
              <div
                key={drone.id}
                onClick={() => handleDroneClick(drone)}
                className="bg-card p-4 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{drone.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        drone.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {drone.status === "active" ? "نشط" : "يشحن"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Battery className="w-4 h-4" />
                    <span className="text-sm font-semibold">{drone.battery}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span>{drone.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>{drone.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{drone.visitorCount} زائر</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>{drone.violations.length} مخالفة</span>
                  </div>
                </div>

                {drone.violations.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {drone.violations.length} مخالفة مكتشفة
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                خريطة المحميات
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                  className="p-2 bg-card border rounded-lg hover:bg-accent transition-colors"
                  title="تصغير"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                  className="p-2 bg-card border rounded-lg hover:bg-accent transition-colors"
                  title="تكبير"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-2 bg-card border rounded-lg hover:bg-accent transition-colors"
                  title="إعادة ضبط"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLocateMe}
                  className={`p-2 border rounded-lg transition-colors ${
                    isTrackingLocation 
                      ? "bg-blue-600 text-white" 
                      : "bg-card hover:bg-accent"
                  }`}
                  title={isTrackingLocation ? "إيقاف تتبع الموقع" : "تحديد موقعي"}
                >
                  <Locate className={`w-5 h-5 ${isTrackingLocation ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-md border overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <img
                  src="/saudi-reserves-map.png"
                  alt="خريطة المحميات السعودية"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Drone Markers */}
                {drones.map((drone) => {
                  const pos = getPositionOnMap(drone.location[0], drone.location[1])
                  return (
                    <div
                      key={drone.id}
                      onClick={() => handleDroneClick(drone)}
                      onMouseEnter={() => setHoveredDrone(drone.id)}
                      onMouseLeave={() => setHoveredDrone(null)}
                      className="absolute cursor-pointer transition-all hover:scale-110"
                      style={{ 
                        left: `${pos.x}%`, 
                        top: `${pos.y}%`,
                        zIndex: hoveredDrone === drone.id ? 20 : 10,
                        transform: `translate(-50%, -50%) scale(${zoomLevel})`
                      }}
                    >
                      <div className="relative">
                        <div 
                          className={`w-5 h-5 rounded-full border-2 border-white shadow-lg ${
                            drone.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                          } ${hoveredDrone === drone.id ? 'ring-2 ring-blue-500' : ''}`}
                        >
                        </div>
                        {drone.violations.length > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full border border-white flex items-center justify-center text-[8px] font-bold shadow-md">
                            {drone.violations.length}
                          </div>
                        )}
                        {hoveredDrone === drone.id && (
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl p-4 min-w-[260px] border-2 border-primary">
                            <p className="font-bold text-base mb-3 text-primary border-b-2 border-primary pb-2">{drone.name}</p>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between bg-blue-50 p-2 rounded">
                                <span className="font-semibold">📡 GPS:</span>
                                <span className="font-mono text-blue-600 font-bold">
                                  {drone.location[0].toFixed(4)}, {drone.location[1].toFixed(4)}
                                </span>
                              </div>
                              <div className="flex justify-between bg-gradient-to-r from-orange-50 to-red-50 p-2 rounded">
                                <span className="font-semibold">🌡️ الحرارة:</span>
                                <span className="text-orange-600 font-bold">{drone.temperature}°C</span>
                              </div>
                              <div className="flex justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded">
                                <span className="font-semibold">👥 الزوار:</span>
                                <span className="text-purple-600 font-bold">{drone.visitorCount}</span>
                              </div>
                              <div className="flex justify-between bg-gray-50 p-2 rounded">
                                <span className="font-semibold">⚠️ المخالفات:</span>
                                <span className="text-red-600 font-bold">{drone.violations.length}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Report Markers */}
                {reports.map((report) => {
                  const pos = getPositionOnMap(report.location[0], report.location[1])
                  const color = report.status === "new" ? "#ef4444" : report.status === "in-progress" ? "#3b82f6" : "#10b981"
                  return (
                    <div
                      key={report.id}
                      onClick={() => handleReportClick(report)}
                      className="absolute cursor-pointer transition-all hover:scale-110"
                      style={{ 
                        left: `${pos.x}%`, 
                        top: `${pos.y}%`, 
                        zIndex: 5,
                        transform: `translate(-50%, -50%) scale(${zoomLevel})`
                      }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      >
                      </div>
                    </div>
                  )
                })}

                {/* User Location Marker */}
                {userLocation && (() => {
                  const pos = getPositionOnMap(userLocation[0], userLocation[1])
                  return (
                    <div
                      className="absolute"
                      style={{ 
                        left: `${pos.x}%`, 
                        top: `${pos.y}%`, 
                        zIndex: 15,
                        transform: `translate(-50%, -50%) scale(${zoomLevel})`
                      }}
                    >
                      <div className="relative">
                        <div className="w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-card p-4 rounded-lg shadow-md border">
              <h3 className="font-bold text-lg mb-3">دليل الخريطة</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  <div>
                    <p className="font-semibold">الطائرات المسيرة</p>
                    <p className="text-sm text-muted-foreground">أخضر: نشط | برتقالي: يشحن</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                  <div>
                    <p className="font-semibold">البلاغات</p>
                    <p className="text-sm text-muted-foreground">أحمر: جديد | أزرق: قيد المعالجة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                  <div>
                    <p className="font-semibold">موقعي</p>
                    <p className="text-sm text-muted-foreground">موقعك الحالي على الخريطة</p>
                  </div>
                </div>
              </div>
              
              {/* Data Indicators Legend */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-sm mb-3">مفاتيح البيانات:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">🌡️</div>
                    <div>
                      <p className="text-xs font-medium">درجة الحرارة</p>
                      <p className="text-xs text-muted-foreground">بالدرجة المئوية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl">💧</div>
                    <div>
                      <p className="text-xs font-medium">الرطوبة</p>
                      <p className="text-xs text-muted-foreground">نسبة مئوية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl">🔋</div>
                    <div>
                      <p className="text-xs font-medium">البطارية</p>
                      <p className="text-xs text-muted-foreground">نسبة الشحن</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl">👥</div>
                    <div>
                      <p className="text-xs font-medium">عدد الزوار</p>
                      <p className="text-xs text-muted-foreground">في المحمية</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Citizens Reports */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-6 h-6" />
                بلاغات المواطنين
              </h2>
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => handleReportClick(report)}
                  className="bg-card p-4 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{report.reporterName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location[0].toFixed(2)}, {report.location[1].toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Violations Modal */}
      {showViolationModal && selectedDrone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">مخالفات {selectedDrone.name}</h2>
              <button
                onClick={() => setShowViolationModal(false)}
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {selectedDrone.violations.map((violation) => (
                <div key={violation.id} className="border rounded-lg p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl">{violation.type}</h3>
                        {violation.aiDetected && (
                          <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                            <Brain className="w-3 h-3" />
                            <span>AI {violation.aiConfidence}%</span>
                          </div>
                        )}
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${getSeverityColor(violation.severity)}`}>
                        {violation.severity === "high" ? "خطورة عالية" : violation.severity === "medium" ? "خطورة متوسطة" : "خطورة منخفضة"}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{violation.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{violation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{violation.location[0].toFixed(4)}, {violation.location[1].toFixed(4)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">صورة المخالفة</p>
                    <p className="text-xs text-muted-foreground mt-1">{violation.image}</p>
                  </div>

                  {/* AI Recommendations */}
                  {violation.aiRecommendations && violation.aiRecommendations.length > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-lg">القرارات المقترحة بالذكاء الاصطناعي</h4>
                      </div>
                      <div className="space-y-3">
                        {violation.aiRecommendations.map((rec, index) => (
                          <div 
                            key={index} 
                            className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {rec.priority === "high" ? (
                                  <AlertCircle className="w-5 h-5" />
                                ) : (
                                  <CheckCircle2 className="w-5 h-5" />
                                )}
                                <h5 className="font-bold">{rec.action}</h5>
                              </div>
                              <span className="text-xs font-semibold px-2 py-1 rounded-full border">
                                {getPriorityText(rec.priority)}
                              </span>
                            </div>
                            <p className="text-sm">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-lg">
              <h2 className="text-xl font-bold">تفاصيل البلاغ</h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">اسم المبلّغ</p>
                    <p className="font-semibold">{selectedReport.reporterName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                    <p className="font-semibold">{selectedReport.reporterPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">وقت البلاغ</p>
                    <p className="font-semibold">{selectedReport.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">الموقع</p>
                    <p className="font-semibold">{selectedReport.location[0].toFixed(4)}, {selectedReport.location[1].toFixed(4)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">الحالة</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedReport.status)}`}>
                      {getStatusText(selectedReport.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">تفاصيل البلاغ</p>
                <p className="text-base">{selectedReport.description}</p>
              </div>

              {/* AI Recommendations for Reports */}
              {selectedReport.aiRecommendations && selectedReport.aiRecommendations.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-lg">القرارات المقترحة بالذكاء الاصطناعي</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedReport.aiRecommendations.map((rec, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {rec.priority === "high" ? (
                              <AlertCircle className="w-5 h-5" />
                            ) : (
                              <CheckCircle2 className="w-5 h-5" />
                            )}
                            <h5 className="font-bold">{rec.action}</h5>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full border">
                            {getPriorityText(rec.priority)}
                          </span>
                        </div>
                        <p className="text-sm">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  بدء المعالجة
                </button>
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  تم الحل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
