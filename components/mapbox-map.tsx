"use client"

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Mapbox Access Token (مجاني)
mapboxgl.accessToken = 'pk.eyJ1IjoibWFudXMtZGVtbyIsImEiOiJjbTRsMnB5ZGowMDRxMmtzNXJxMGw5YjN6In0.placeholder'

interface Drone {
  id: string
  name: string
  location: [number, number]
  battery: number
  status: string
  violations: any[]
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
  status: string
}

interface MapboxMapProps {
  drones: Drone[]
  reports: Report[]
  onDroneClick: (drone: Drone) => void
  onReportClick: (report: Report) => void
}

export default function MapboxMap({ drones, reports, onDroneClick, onReportClick }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // إنشاء الخريطة
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // نمط الشوارع
      center: [45.0, 24.0], // مركز السعودية
      zoom: 5.5,
      minZoom: 5,
      maxZoom: 18,
      maxBounds: [
        [32, 15], // جنوب غرب
        [58, 33]  // شمال شرق
      ]
    })

    // إضافة أدوات التحكم
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-left')

    // انتظار تحميل الخريطة
    map.current.on('load', () => {
      // إضافة علامات الدرونز
      drones.forEach((drone) => {
        const el = document.createElement('div')
        el.className = 'drone-marker'
        el.style.cssText = `
          cursor: pointer;
          position: relative;
        `
        
        const color = drone.status === "active" ? "#10b981" : "#f59e0b"
        el.innerHTML = `
          <div style="position: relative;">
            <div style="
              background: ${color};
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 4px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
            ">
              🚁
            </div>
            ${drone.violations.length > 0 ? `
              <div style="
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: bold;
              ">
                ${drone.violations.length}
              </div>
            ` : ''}
          </div>
        `

        el.addEventListener('click', () => {
          onDroneClick(drone)
        })

        // إنشاء Popup
        const popupContent = `
          <div dir="rtl" style="min-width: 280px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #059669; border-bottom: 2px solid #059669; padding-bottom: 8px;">
              ${drone.name}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
              <div style="background: linear-gradient(to right, #fff7ed, #fed7aa); padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 18px;">🌡️</span>
                  <span style="font-weight: 600;">درجة الحرارة:</span>
                </div>
                <span style="color: #ea580c; font-weight: bold; font-size: 16px;">${drone.temperature}°C</span>
              </div>
              <div style="background: linear-gradient(to right, #eff6ff, #bfdbfe); padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 18px;">💧</span>
                  <span style="font-weight: 600;">الرطوبة:</span>
                </div>
                <span style="color: #2563eb; font-weight: bold;">${drone.humidity}%</span>
              </div>
              <div style="background: linear-gradient(to right, #fdf4ff, #f3e8ff); padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 18px;">👥</span>
                  <span style="font-weight: 600;">عدد الزوار:</span>
                </div>
                <span style="color: #9333ea; font-weight: bold;">${drone.visitorCount} زائر</span>
              </div>
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600;">🔋 البطارية:</span>
                <span style="color: ${drone.battery > 50 ? '#10b981' : '#f59e0b'}; font-weight: bold;">${drone.battery}%</span>
              </div>
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600;">⚠️ المخالفات:</span>
                <span style="color: #ef4444; font-weight: bold;">${drone.violations.length}</span>
              </div>
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600;">📡 الحالة:</span>
                <span style="color: ${drone.status === 'active' ? '#10b981' : '#f59e0b'}; font-weight: bold;">
                  ${drone.status === 'active' ? 'نشط ✓' : 'يشحن ⚡'}
                </span>
              </div>
            </div>
            ${drone.violations.length > 0 ? `
              <button onclick="window.dispatchEvent(new CustomEvent('drone-click', { detail: '${drone.id}' }))" 
                style="
                  margin-top: 12px;
                  width: 100%;
                  background: #ef4444;
                  color: white;
                  padding: 10px;
                  border-radius: 8px;
                  font-size: 13px;
                  font-weight: bold;
                  border: none;
                  cursor: pointer;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                ">
                🚨 عرض المخالفات (${drone.violations.length})
              </button>
            ` : ''}
          </div>
        `

        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '320px' })
          .setHTML(popupContent)

        new mapboxgl.Marker(el)
          .setLngLat([drone.location[1], drone.location[0]])
          .setPopup(popup)
          .addTo(map.current!)
      })

      // إضافة علامات البلاغات
      reports.forEach((report) => {
        const el = document.createElement('div')
        el.className = 'report-marker'
        el.style.cssText = `
          cursor: pointer;
        `
        
        const color = report.status === "new" ? "#ef4444" : report.status === "in-progress" ? "#3b82f6" : "#10b981"
        el.innerHTML = `
          <div style="
            background: ${color};
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          ">
            📢
          </div>
        `

        el.addEventListener('click', () => {
          onReportClick(report)
        })

        const statusText = report.status === "new" ? "جديد" : report.status === "in-progress" ? "قيد المعالجة" : "تم الحل"
        const statusColor = report.status === "new" ? "#ef4444" : report.status === "in-progress" ? "#3b82f6" : "#10b981"

        const popupContent = `
          <div dir="rtl" style="min-width: 250px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
              📢 بلاغ من مواطن
            </h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px;">
                <span style="font-weight: 600;">👤 ${report.reporterName}</span>
              </div>
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px;">
                <span style="font-size: 11px; color: #6b7280;">🕐 ${report.time}</span>
              </div>
              <div style="padding: 8px;">
                <span style="
                  background: ${statusColor}20;
                  color: ${statusColor};
                  padding: 4px 12px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: bold;
                ">
                  ${statusText}
                </span>
              </div>
            </div>
            <button onclick="window.dispatchEvent(new CustomEvent('report-click', { detail: '${report.id}' }))" 
              style="
                margin-top: 12px;
                width: 100%;
                background: #3b82f6;
                color: white;
                padding: 10px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: bold;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ">
              📋 عرض التفاصيل
            </button>
          </div>
        `

        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '280px' })
          .setHTML(popupContent)

        new mapboxgl.Marker(el)
          .setLngLat([report.location[1], report.location[0]])
          .setPopup(popup)
          .addTo(map.current!)
      })
    })

    // الاستماع للأحداث المخصصة
    const handleDroneClick = (e: any) => {
      const drone = drones.find(d => d.id === e.detail)
      if (drone) onDroneClick(drone)
    }

    const handleReportClick = (e: any) => {
      const report = reports.find(r => r.id === e.detail)
      if (report) onReportClick(report)
    }

    window.addEventListener('drone-click', handleDroneClick)
    window.addEventListener('report-click', handleReportClick)

    return () => {
      window.removeEventListener('drone-click', handleDroneClick)
      window.removeEventListener('report-click', handleReportClick)
      map.current?.remove()
    }
  }, [drones, reports, onDroneClick, onReportClick])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}
