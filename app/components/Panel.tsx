export function Panel({ title = "O nás" }) {
  return (
    <div className="relative w-[560px] max-w-full">
      {/* Handle (behind) */}
      <div
        className="
          absolute left-10 -top-7
          h-14 w-[520px]
          bg-[#b5b5b5]
          shadow-[0_10px_18px_rgba(0,0,0,.35)]
          border border-[#8f8f8f]
          [clip-path:polygon(18px_0,calc(100%-18px)_0,100%_18px,100%_100%,0_100%,0_18px)]
          z-0
        "
      />

      {/* Panel (front) */}
      <div className="relative z-10 bg-[#E5E5E5] p-[6px] border-2 border-white">
        {/* mid frame */}
        <div className="border-2 border-[#c9c9c9] bg-white">
          {/* inner bevel line */}
          <div className="border-t border-[#ffffff]">
            {/* Title bar */}
            <div className="relative px-6 py-4 text-white">
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-b from-[#840000] to-[#E31E24]
                "
              />
              {/* subtle inner line like in the screenshot */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#b00000]/70" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/15" />

              <div className="relative flex items-center justify-between">
                {/* Title */}
                <div className="text-[54px] leading-none font-extrabold tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,.35)]">
                  {title}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white min-h-[420px] border-t-2 border-[#c9c9c9]" />
            <div className="bg-[#E5E5E5] min-h-[170px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
