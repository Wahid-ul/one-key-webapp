import { useRef, useEffect } from 'react'

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'aadhaar' | 'pan') => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const aadhaarRef = useRef<HTMLDivElement>(null)
  const panRef = useRef<HTMLDivElement>(null)
  const onlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = (ref: React.RefObject<HTMLDivElement | null>, speed: number) => {
      if (!ref.current) return
      let position = 0
      const step = () => {
        position += speed
        if (position >= 50) {
          position = 0
        }
        ref.current!.style.transform = `translateX(-${position}%)`
        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    // Speed: 0.0278 % per frame ≈ 30s for full cycle
    animate(aadhaarRef, 0.0278)
    animate(panRef, 0.0278)
    animate(onlineRef, 0.0278)
  }, [])

  const AnimatedBox = ({ title, desc, delay }: { title: string; desc: string; delay?: string }) => (
    <div className={`relative p-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse animate-slide ${delay || ''}`}>
      <div className="bg-gray-100 rounded-xl p-5 h-full">
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-10 space-y-10">

      {/* Aadhaar Card Section */}
      <section className="max-w-5xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold">Aadhaar Card</h2>
          <button
            onClick={() => onNavigate('aadhaar')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition ml-4"
            title="View all Aadhaar services"
          >
            →
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Aadhaar services for enrollment, updates, and document access.
          Get quick assistance for all UIDAI-related needs.
        </p>

        <div className="overflow-hidden w-full">
          <div ref={aadhaarRef} className="flex gap-6 w-[200%]">
            <AnimatedBox
              title="New Enrollment"
              desc="Apply for a new Aadhaar card with biometric and demographic details."
              delay="delay-0"
            />
            <AnimatedBox
              title="Update Aadhaar"
              desc="Update name, address, mobile number, or date of birth."
              delay="delay-500"
            />
            <AnimatedBox
              title="Download Aadhaar"
              desc="Download Aadhaar PDF or retrieve lost Aadhaar details."
              delay="delay-1000"
            />
            <AnimatedBox
              title="Biometric Update"
              desc="Update biometric information like fingerprints or iris scan."
              delay="delay-1500"
            />
            <AnimatedBox
              title="New Enrollment"
              desc="Apply for a new Aadhaar card with biometric and demographic details."
              delay="delay-0"
            />
            <AnimatedBox
              title="Update Aadhaar"
              desc="Update name, address, mobile number, or date of birth."
              delay="delay-500"
            />
            <AnimatedBox
              title="Download Aadhaar"
              desc="Download Aadhaar PDF or retrieve lost Aadhaar details."
              delay="delay-1000"
            />
            <AnimatedBox
              title="Biometric Update"
              desc="Update biometric information like fingerprints or iris scan."
              delay="delay-1500"
            />
          </div>
        </div>
      </section>

      {/* PAN Card Section */}
      <section className="max-w-5xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold">PAN Card</h2>
          <button
            onClick={() => onNavigate('pan')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition ml-4"
            title="View all PAN services"
          >
            →
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          PAN card services for individuals and businesses including new
          applications and corrections.
        </p>

        <div className="overflow-hidden w-full">
          <div ref={panRef} className="flex gap-6 w-[200%]">
            <AnimatedBox
              title="New PAN"
              desc="Apply for a new PAN card for tax and financial purposes."
              delay="delay-0"
            />
            <AnimatedBox
              title="PAN Correction"
              desc="Correct name, DOB, photo, or signature in PAN records."
              delay="delay-500"
            />
            <AnimatedBox
              title="PAN–Aadhaar Link"
              desc="Link PAN with Aadhaar to avoid penalties."
              delay="delay-1000"
            />
            <AnimatedBox
              title="New PAN"
              desc="Apply for a new PAN card for tax and financial purposes."
              delay="delay-0"
            />
            <AnimatedBox
              title="PAN Correction"
              desc="Correct name, DOB, photo, or signature in PAN records."
              delay="delay-500"
            />
            <AnimatedBox
              title="PAN–Aadhaar Link"
              desc="Link PAN with Aadhaar to avoid penalties."
              delay="delay-1000"
            />
          </div>
        </div>
      </section>

      {/* Online Services Section */}
      <section className="max-w-5xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-2">Online Services</h2>
        <p className="text-gray-600 mb-6">
          Access various government and utility services online with ease.
        </p>

        <div className="overflow-hidden w-full">
          <div ref={onlineRef} className="flex gap-6 w-[200%]">
            <AnimatedBox
              title="Bill Payments"
              desc="Electricity, water, mobile recharge, and more."
              delay="delay-0"
            />
            <AnimatedBox
              title="Govt Forms"
              desc="Apply for government schemes and online forms."
              delay="delay-500"
            />
            <AnimatedBox
              title="Certificates"
              desc="Birth, caste, income, and residence certificates."
              delay="delay-1000"
            />
            <AnimatedBox
              title="Bill Payments"
              desc="Electricity, water, mobile recharge, and more."
              delay="delay-0"
            />
            <AnimatedBox
              title="Govt Forms"
              desc="Apply for government schemes and online forms."
              delay="delay-500"
            />
            <AnimatedBox
              title="Certificates"
              desc="Birth, caste, income, and residence certificates."
              delay="delay-1000"
            />
          </div>
        </div>
      </section>

    </div>
  )
}

export default Dashboard
