"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, MapPin, Phone, Star } from "lucide-react"
import React, { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const [activeSection, setActiveSection] = React.useState("home")
  const [carouselApi, setCarouselApi] = useState<any>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Configuração do carrossel automático
  useEffect(() => {
    if (carouselApi) {
      // Função para avançar para o próximo slide
      const nextSlide = () => {
        if (!isPaused) {
          carouselApi.scrollNext()
        }
      }

      // Iniciar o autoplay
      autoplayRef.current = setInterval(nextSlide, 3000) // Muda a cada 3 segundos

      // Limpar o intervalo quando o componente for desmontado
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      }
    }
  }, [carouselApi, isPaused])

  // Pausar o autoplay quando o mouse estiver sobre o carrossel
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Imagens da galeria
  const galleryImages = [
    { src: "/gallery/corte1.jpeg", alt: "Corte masculino moderno" },
    { src: "/gallery/corte2.jpeg", alt: "Cliente satisfeito com seu corte" },
    { src: "/gallery/corte3.jpeg", alt: "Corte com coloração platinada" },
    { src: "/gallery/corte4.jpeg", alt: "Corte moderno com coloração" },
    { src: "/gallery/corte5.jpeg", alt: "Corte estilo moicano" },
    { src: "/gallery/corte6.jpeg", alt: "Corte feminino undercut" },
    { src: "/gallery/corte7.jpeg", alt: "Degradê com design" },
    { src: "/gallery/corte8.jpeg", alt: "Corte com textura e degradê" },
    { src: "/gallery/corte9.jpeg", alt: "Corte feminino moderno" },
    { src: "/gallery/equipe.jpeg", alt: "Alguns de nossos clientes" },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "gallery", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching the section

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to set initial active section

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Capturar os valores dos campos
    const nameInput = document.getElementById("name") as HTMLInputElement
    const phoneInput = document.getElementById("phone") as HTMLInputElement
    const messageInput = document.getElementById("message") as HTMLTextAreaElement

    const name = nameInput?.value || ""
    const phone = phoneInput?.value || ""
    const message = messageInput?.value || ""

    // Construir a mensagem
    const whatsappMessage = `Olá, meu nome é ${name}. 
Telefone: ${phone}
Mensagem: ${message}`

    // Número do WhatsApp do Esdras (removendo caracteres especiais)
    const whatsappNumber = "5519992232422"

    // Criar a URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Abrir o WhatsApp em uma nova aba
    window.open(whatsappUrl, "_blank")
  }

  // Função para abrir o WhatsApp para agendamento
  const handleScheduleWhatsApp = () => {
    const whatsappNumber = "5519992232422"
    const message = "Olá Esdras tudo bem?, vim pelo seu site, e gostaria de marcar um horario.."
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gold/20 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-gold.png"
              alt="Esdras Leme Barbershop Logo"
              width={60}
              height={60}
              className="h-14 w-14 rounded-full"
            />
            <span className="text-xl font-bold text-gold">Esdras Leme Barbershop</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {[
                { id: "home", label: "Home" },
                { id: "services", label: "Serviços" },
                { id: "about", label: "Sobre" },
                { id: "gallery", label: "Galeria" },
                { id: "contact", label: "Contato" },
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className={`transition-colors duration-300 ${
                      activeSection === item.id ? "text-gold" : "text-white hover:text-gold/80"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button className="hidden bg-gold text-black hover:bg-gold/80 md:block" onClick={handleScheduleWhatsApp}>
            Agendar
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-[90vh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/logo-white.png')] bg-contain bg-center bg-no-repeat opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
          <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
            <Image
              src="/logo-gold.png"
              alt="Esdras Leme Barbershop Logo"
              width={200}
              height={200}
              className="mb-8 rounded-full"
            />
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              <span className="text-gold">Esdras Leme</span> Barbershop
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-white/80">
              Onde estilo e tradição se encontram para oferecer a melhor experiência em cuidados masculinos
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="bg-gold text-black hover:bg-gold/80" onClick={handleScheduleWhatsApp}>
                Agendar Agora
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Nossos Serviços
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gold md:text-4xl">Nossos Serviços</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Oferecemos uma variedade de serviços de barbearia de alta qualidade para atender às suas necessidades
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="M7 21L4 18C4 15 7 13 10 13C13 13 16 15 16 18L13 21" />
                      <path d="M22 21L19 18C19 15 22 13 22 13" />
                      <path d="M10 13V4C10 2.9 10.9 2 12 2H13C14.1 2 15 2.9 15 4V13" />
                      <path d="M18 6L15.1 3.1" />
                      <path d="M16.5 8.5L13.5 5.5" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Corte de Cabelo</h3>
                  <p className="text-white/70">
                    Cortes modernos ou clássicos, adaptados ao seu estilo e formato de rosto.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="M8.5 2v2a2.5 2.5 0 0 1-5 0V2" />
                      <path d="M12 2v2a2.5 2.5 0 0 0 5 0V2" />
                      <path d="M20 15a7 7 0 1 0-14 0" />
                      <path d="M15 11v4" />
                      <path d="M11 11v4" />
                      <path d="M7 11v4" />
                      <path d="M20 11v4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Barba</h3>
                  <p className="text-white/70">
                    Modelagem, aparagem e tratamento completo para sua barba, incluindo toalha quente e produtos
                    especiais.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="M3 9c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <path d="M8 4v4" />
                      <path d="M16 4v4" />
                      <path d="M12 14v3" />
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Tratamento Facial</h3>
                  <p className="text-white/70">
                    Limpeza de pele, esfoliação e máscaras faciais para revitalizar sua pele.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="m21.9 8.6-2-4a1 1 0 0 0-.9-.6h-14a1 1 0 0 0-.9.6l-2 4a1 1 0 0 0 0 .8l2 4a1 1 0 0 0 .9.6h14a1 1 0 0 0 .9-.6l2-4a1 1 0 0 0 0-.8Z" />
                      <path d="M9 8h6" />
                      <path d="M12 16v-4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Coloração</h3>
                  <p className="text-white/70">
                    Coloração profissional para cabelo e barba, com produtos de alta qualidade.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="M16 2s-2 4-2 6c0 3.3 2 6 6 6s6-2.7 6-6c0-2-2-6-2-6" />
                      <path d="M12 14c-3.3 0-6 2.7-6 6 0 0 2 4 6 4s6-4 6-4" />
                      <path d="M4 8a4 4 0 0 1 8 0c0 2.5-2 6-4 8-2-2-4-5.5-4-8Z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Hidratação</h3>
                  <p className="text-white/70">
                    Tratamentos de hidratação profunda para cabelo e barba, restaurando a saúde e o brilho.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-gold/10 p-3 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-gold"
                    >
                      <path d="M16 2s-2 4-2 6c0 3.3 2 6 6 6s6-2.7 6-6c0-2-2-6-2-6" />
                      <path d="M12 14c-3.3 0-6 2.7-6 6 0 0 2 4 6 4s6-4 6-4" />
                      <path d="M4 8a4 4 0 0 1 8 0c0 2.5-2 6-4 8-2-2-4-5.5-4-8Z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Corte + Barba</h3>
                  <p className="text-white/70">
                    Combinação perfeita de corte de cabelo e tratamento completo de barba para um visual impecável.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-b from-black to-black/90 py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gold md:text-4xl">Sobre Mim</h2>
                <p className="mb-6 text-white/70">
                  Com mais de 20 anos de experiência, Esdras Leme se estabeleceu como referência em barbearia de alto
                  padrão. Altamente qualificado e comprometido, ele proporciona um serviço excepcional em um ambiente
                  sofisticado e acolhedor.
                </p>
                <p className="mb-8 text-white/70">
                  Utilizamos produtos de primeira linha e técnicas modernas para garantir resultados impecáveis. Mais do
                  que um corte de cabelo, oferecemos uma experiência completa de cuidados masculinos.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-white/70">5.0 (300+ avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gold" />
                    <span className="text-white/70">20+ anos de experiência</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[700px] overflow-hidden rounded-lg">
                <Image
                  src="/esdrasPerfil.jpeg"
                  alt="Esdras Leme - Barbeiro Profissional"
                  fill
                  className="object-cover object-center scale-80"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gold md:text-4xl">Nossa Galeria</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Confira alguns dos nossos melhores trabalhos e o ambiente elegante da nossa barbearia
              </p>
            </div>
            <Carousel
              className="mx-auto max-w-5xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={500}
                          height={600}
                          className="h-[350px] w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="mt-2 text-center text-sm text-gold">{image.alt}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <span className="text-xs text-white/70"></span>
              </div>
              <CarouselPrevious className="border-gold text-gold" />
              <CarouselNext className="border-gold text-gold" />
            </Carousel>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-b from-black/90 to-black py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gold md:text-4xl">Contato</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Entre em contato conosco para agendar seu horário ou tirar dúvidas
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-gold/10 p-3">
                    <Phone className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Telefone</h3>
                  <p className="text-white/70">(19) 99223-2422</p>
                  <p className="text-white/70">(19) 3617-2592</p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-gold/10 p-3">
                    <MapPin className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Endereço</h3>
                  <p className="text-white/70">Rua 7, 131 - Centro</p>
                  <p className="text-white/70">Rio Claro, SP</p>
                </CardContent>
              </Card>
              <Card className="border-gold/20 bg-black/40 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-gold/10 p-3">
                    <Clock className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Horário</h3>
                  <p className="text-white/70">Segunda a Sábado</p>
                  <p className="text-white/70">9h às 20h</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 rounded-lg border border-gold/20 bg-black/40 p-8 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gold">Envie uma Mensagem</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-white">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border border-gold/20 bg-black/60 px-4 py-2 text-white focus:border-gold focus:outline-none"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-white">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full rounded-md border border-gold/20 bg-black/60 px-4 py-2 text-white focus:border-gold focus:outline-none"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-white">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full rounded-md border border-gold/20 bg-black/60 px-4 py-2 text-white focus:border-gold focus:outline-none"
                        placeholder="Sua mensagem"
                      ></textarea>
                    </div>
                    <Button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full bg-gold text-black hover:bg-gold/80"
                    >
                      Enviar via WhatsApp
                    </Button>
                  </form>
                </div>
                <div className="h-[300px] overflow-hidden rounded-lg md:h-auto">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235!2d-47.5604175!3d-22.4191486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c7da5db9fbb573%3A0x645f456a57ac8eab!2sR.%207%2C%20131%20-%20Centro%2C%20Rio%20Claro%20-%20SP%2C%2013500-143!5e0!3m2!1spt-BR!2sbr!4v1710805114912!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Mapa da localização"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/20 bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-gold.png"
                  alt="Esdras Leme Barbershop Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 rounded-full"
                />
                <span className="text-xl font-bold text-gold">Esdras Leme Barbershop</span>
              </div>
              <p className="mt-4 text-white/70">
                Old School Classic desde 1988. Onde estilo e tradição se encontram para oferecer a melhor experiência em
                cuidados masculinos.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-gold">Links Rápidos</h3>
              <ul className="space-y-2 text-white/70">
                {[
                  { id: "home", label: "Home" },
                  { id: "services", label: "Serviços" },
                  { id: "about", label: "Sobre" },
                  { id: "gallery", label: "Galeria" },
                  { id: "contact", label: "Contato" },
                ].map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className={`transition-colors duration-300 ${
                        activeSection === item.id ? "text-gold" : "hover:text-gold"
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-gold">Siga-nos</h3>
              <div className="flex gap-4">
                <a href="#" className="rounded-full bg-gold/10 p-2 text-gold hover:bg-gold/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-gold/10 p-2 text-gold hover:bg-gold/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gold/10 pt-6 text-center text-white/50">
            <p>© {new Date().getFullYear()} Esdras Leme Barbershop. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

