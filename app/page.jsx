import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Image from "next/image";
import { FEATURES, STEPS, TESTIMONIALS } from "../lib/landing";

export default function LandingPage() {
  return (
    <div className="flex flex-col pt-16 bg-[#FFF1E8]">
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <div className="inline-block px-6 py-2 border-4 border-black bg-[#FFDC02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
            Split expenses. cause you BROKE mf.
          </div>

          <h1 className="mx-auto max-w-6xl text-4xl font-bold md:text-8xl text-black">
            The most brutal way to split expenses with your cheap ass friends
          </h1>

          <p className="mx-auto max-w-[700px] text-black/70 md:text-xl/relaxed font-medium">
            Track shared expenses, split bills effortlessly, and settle up
            quickly. Never worry about who owes who again.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button
              asChild
              size="lg"
              className="px-6 py-3 text-sm font-bold border-4 border-black bg-[#6CBD45] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-[#6CBD45]"
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-6 py-3 text-sm font-bold border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-white"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-[#7189FF] p-2 aspect-[16/9]">
            <Image
              src="/bolo.png"
              width={1280}
              height={720}
              alt="Banner"
              className="rounded-none mx-auto border-2 border-black"
              priority
            />
          </div>
        </div>
        
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block px-6 py-2 border-4 border-black bg-[#FFDC02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
            Features
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Everything you need to split expenses
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-black/70 md:text-xl/relaxed font-medium">
            Our platform provides all the tools you need to handle shared
            expenses with ease.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }) => (
              <Card
                key={title}
                className="flex flex-col items-center space-y-4 p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className={`rounded-none p-3 border-4 border-black ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <h3 className="text-xl font-bold text-black">{title}</h3>
                <p className="text-black/70 font-medium">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block px-6 py-2 border-4 border-black bg-[#FFDC02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
            How It Works
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Splitting expenses has never been easier
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-black/70 md:text-xl/relaxed font-medium">
            Follow these simple steps to start tracking and splitting expenses
            with friends.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ label, title, description }) => (
              <div key={label} className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center border-4 border-black bg-[#FFDC02] text-xl font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {label}
                </div>
                <h3 className="text-xl font-bold text-black">{title}</h3>
                <p className="text-black/70 font-medium text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="py-20 bg-white border-t-4 border-b-4 border-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block px-6 py-2 border-4 border-black bg-[#FFDC02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
            Testimonials
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            What our users are saying
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
              <Card key={name} className="flex flex-col justify-between border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FFF1E8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <CardContent className="space-y-4 p-6">
                  <p className="text-black/70 font-medium">"{quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-full overflow-hidden">
                      <Avatar className="w-12 h-12 rounded-none">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="bg-[#FFDC02] text-black font-bold uppercase">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-black">{name}</p>
                      <p className="text-sm font-medium text-black/70">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Call‑to‑Action ───── */}
      <section className="py-20 bg-[#7189FF] border-t-4 border-b-4 border-black">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-black">
            Ready to simplify expense sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-black/80 md:text-xl/relaxed font-medium">
            Join thousands of users who have made splitting expenses
            stress‑free.
          </p>
          <Button asChild size="lg" className="px-6 py-3 text-sm font-bold border-4 border-black bg-[#FFDC02] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-[#FFDC02]">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t-4 border-black bg-[#FFF1E8] py-12 text-center text-sm font-bold text-black">
        © {new Date().getFullYear()} Brutsplit. All rights reserved.
      </footer>
    </div>
  );
}