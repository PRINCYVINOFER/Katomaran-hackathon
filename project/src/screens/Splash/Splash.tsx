import { CheckSquareIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Splash = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white grid justify-items-center [align-items:start] w-screen min-h-screen h-full">
      <Card className="bg-white overflow-hidden w-[440px] h-[956px] relative border-none shadow-none">
        <CardContent className="p-0">
          {/* Background gradient with wave */}
          <div className="w-[451px] h-[660px] top-[-3px] -left-1.5 bg-gradient-to-b from-[#df8e8f] via-[#e8a5a6] to-[#f0bcbd] absolute rounded-b-[100px]">
            {/* Status bar */}
            <div className="flex w-[440px] h-[59px] items-end justify-center absolute top-[3px] left-1.5">
              {/* Time */}
              <div className="flex flex-col items-center justify-center gap-2 pl-2.5 pr-0 pt-0 pb-[3px] relative flex-1 self-stretch grow">
                <div className="relative w-[54px] h-[21px] rounded-3xl">
                  <div className="absolute w-[54px] top-0 left-0 font-callout-bold font-[number:var(--callout-bold-font-weight)] text-label-colordarkprimary text-[length:var(--callout-bold-font-size)] text-center tracking-[var(--callout-bold-letter-spacing)] leading-[var(--callout-bold-line-height)] whitespace-nowrap [font-style:var(--callout-bold-font-style)]">
                    9:41
                  </div>
                </div>
              </div>

              {/* Center notch */}
              <div className="inline-flex flex-col items-center justify-center relative self-stretch flex-[0_0_auto]">
                <div className="relative w-[125px] h-[37px] bg-system-backgrounddark-baseprimary rounded-[100px]">
                  <div className="absolute w-20 h-[37px] top-0 left-0 bg-system-backgrounddark-baseprimary rounded-[100px]" />
                  <div className="absolute w-[37px] h-[37px] top-0 left-[88px] bg-system-backgrounddark-baseprimary rounded-[100px]" />
                </div>
              </div>

              {/* Status icons */}
              <div className="flex items-center justify-center gap-2 pl-0 pr-[11px] py-0 relative flex-1 self-stretch grow">
                <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
                  <img
                    className="relative w-[18px] h-3"
                    alt="Icon mobile signal"
                    src="/icon---mobile-signal.svg"
                  />
                  <img
                    className="relative w-[17px] h-[11.83px]"
                    alt="Wifi"
                    src="/wifi.svg"
                  />
                  <div className="relative w-[27.4px] h-[13px]">
                    <div className="w-[25px] h-[13px] top-0 left-0 bg-[url(/outline.svg)] absolute bg-[100%_100%]">
                      <img
                        className="absolute w-[15px] h-[9px] top-0.5 left-0.5"
                        alt="Fill"
                        src="/fill.svg"
                      />
                    </div>
                    <img
                      className="absolute w-px h-1 top-[5px] left-[26px]"
                      alt="Battery end"
                      src="/battery-end.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* App logo */}
            <div className="absolute w-[309px] h-[309px] top-[210px] left-[76px] flex items-center justify-center">
              <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <CheckSquareIcon className="w-24 h-24 text-white" />
              </div>
            </div>

            {/* App title with icon */}
            <div className="absolute w-60 h-[50px] top-40 left-[107px]">
              <div className="absolute top-0 left-0 [font-family:'Outfit',Helvetica] font-semibold text-white text-[40px] text-center tracking-[0] leading-[normal]">
                To -Do List
              </div>
              <CheckSquareIcon className="absolute w-8 h-8 top-[9px] left-[206px] text-white" />
            </div>
          </div>

          {/* Bottom indicator line */}
          <div className="absolute w-[119px] h-[5px] top-[939px] left-40 bg-gray-300 rounded-full" />

          {/* Start button */}
          <Button 
            onClick={handleGetStarted}
            className="flex w-[290px] h-[50px] items-center justify-center gap-2.5 px-[170px] py-[19px] absolute top-[844px] left-[75px] bg-[#df8e8f] hover:bg-[#c97a7b] rounded-[25px] text-white font-medium text-2xl [font-family:'Outfit',Helvetica] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Let&apos;s start
          </Button>

          {/* Welcome text */}
          <div className="absolute w-[386px] top-[709px] left-[27px] [font-family:'Outfit',Helvetica] font-normal text-[#484848] text-base text-center tracking-[0] leading-6">
            Thank you for choosing DoTask to support your productivity.
            Let&#39;s begin the adventure of organizing activities more
            efficiently!
          </div>

          {/* Welcome heading */}
          <div className="absolute top-[667px] left-[110px] [font-family:'Outfit',Helvetica] font-semibold text-black text-2xl text-center tracking-[0] leading-6 whitespace-nowrap">
            Welcome To Do Task
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
