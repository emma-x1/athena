import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Marquee from 'react-marquee-slider';

import { FaCalendarDay, FaLocationDot } from "react-icons/fa6";

type EventInfo = {
  accentColor: string;
  bgColor?: string;
  tintColor?: string;
  name: string;
  date: string;
  location: string;
  github_link: string;
  logo: string;
  cardLogo?: string;
  photos: string[];
  photocreds: string;
  description: string;
  className: string;
  mostRecent?: boolean;
};

export default function PastEvent({ accentColor, bgColor, tintColor, name, date, location, github_link, logo, cardLogo, photos, photocreds, description, className, mostRecent = false }: EventInfo) {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <TintedEventCard
        className={className}
        tintColor={tintColor || 'black'}
        accentColor={accentColor}
        bgColor={bgColor}
        image={photos[0]}
        href={"#"}
        title={name}
        description={description}
        name={name}
        location={location}
        date={date}
        logo={logo}
        cardLogo={cardLogo}
        github_link={github_link}
        photos={photos}
        photocreds={photocreds}
        mostRecent={mostRecent}
        onClick={() => {setModalOpen(true); console.log(modalOpen)}}
      />
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="transition delay-0 duration-300 ease-out data-[closed]:opacity-0 z-50" transition>
        <div className="fixed inset-0 bg-black/25 background-blur-sm flex w-screen items-center justify-center p-6 md:p-16">
          <DialogPanel className="relative w-[85vw] h-[80vh] bg-white rounded-lg">
            <button className="absolute right-4 top-4 text-black z-10 text-7xl transition hover:scale-110 block" onClick={() => setModalOpen(false)}><img src="https://icons.hackclub.com/api/icons/black/glyph:view-close.svg" className="size-14 cursor-pointer" alt="close" /></button>
            <div className="flex flex-col-reverse md:flex-row overflow-y-auto h-full">
              <div className="md:w-1/2 lg:w-2/5 p-4 lg:p-10 flex flex-col justify-center">
                {/* <div className="text-3xl lg:text-4xl font-bold" style={{
                  color: accentColor,
                }}>{name}</div> */}
                <img className="w-auto max-w-full h-auto" src={logo} alt={name}></img>
                {/* <div className="text-3xl font-bold">{name}</div> */}
                
                <div className="text-base flex gap-4">
                  <span className="flex gap-2 items-center flex-nowrap"><FaLocationDot /> {location}</span>
                  <span className="flex gap-2 items-center flex-nowrap"><FaCalendarDay /> {date}</span>
                </div>
                <div className="mt-4">
                  {description}
                </div>
                <div className="mt-4 mb-10 md:mb-0">
                  <a className="underline" href={github_link}>View details on planning</a>
                </div>
              </div>
              <div className="md:w-1/2 lg:w-3/5 p-4 flex items-center">
                <div className="rounded-md overflow-hidden mt-6 h-fit">
                  <Marquee velocity={10} direction={"rtl"} scatterRandomly={false} resetAfterTries={0} onInit={() => {}} onFinish={() => {}}>
                    {photos.slice(0, photos.length / 2).map((photo, id) => (
                      <img key={id} src={photo} alt="" className="h-[15vh] md:h-[30vh] w-auto mx-3 rounded-md" />
                    ))}
                  </Marquee>
                  <div className="my-3"></div>
                  <Marquee velocity={10} direction={"rtl"} scatterRandomly={false} resetAfterTries={0} onInit={() => {}} onFinish={() => {}}>
                  {photos.slice(photos.length / 2).map((photo, id) => (
                      <img key={id} src={photo} alt="" className="h-[15vh] md:h-[30vh] w-auto mx-3 rounded-md" />
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

interface BaseEventCardProps {
  tintColor: string;
  image: string;
  href: string;
  title: string;
  description: string;
}

type TintedEventCardProps = BaseEventCardProps & EventInfo & { onClick: () => void, mostRecent: boolean };

function TintedEventCard(props: TintedEventCardProps) {
  console.log(props.cardLogo);
  return (
    <div className={`border-2 group transition-all hover:scale-105 p-4 relative overflow-hidden shadow-md min-h-[20vh] rounded-lg bg-no-repeat bg-contain bg-center ${props.className} cursor-pointer`} style={props.cardLogo ? {
      backgroundImage: `url(${props.cardLogo})`,
      backgroundColor: props.bgColor || 'white',
    } : {
      backgroundImage: `url(${props.logo})`,
    }} onClick={props.onClick}>
      <div className="absolute w-[105%] h-[105%] top-0 left-0 z-0 group-hover:opacity-100 opacity-0 transition bg-cover bg-center bg-no-repeat bg-origin-border" style={{
        backgroundImage: `url(${props.image})`,
      }}></div>
      <div className="absolute w-full h-full top-0 left-0 z-10 opacity-0 group-hover:opacity-50 mix-blend-multiply" style={{
        backgroundColor: props.tintColor
      }}></div>
      <div className="opacity-0 group-hover:opacity-100 transition text-left absolute bottom-4 left-0 z-20 pl-4 text-white"
      // style={{
      //   color: props.accentColor
      // }}
      >
        <div className="text-3xl lg:text-4xl font-bold">{props.title}</div>
        <div className="flex flex-nowrap gap-4">
          <span className="text-lg px-4 py-0.5 rounded-full" style={{
            backgroundColor: `${props.accentColor || '#000000'}50`,
          }}>{props.location}</span>
          <span className="text-lg px-4 py-0.5 rounded-full" style={{
            backgroundColor: `${props.accentColor || '#000000'}50`,
          }}>{props.date}</span>
        </div>
      </div>
    </div>
  )
}