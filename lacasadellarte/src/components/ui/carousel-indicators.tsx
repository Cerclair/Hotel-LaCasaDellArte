'use client';

interface CarouselIndicatorsProps {
  slideCount: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export function CarouselIndicators({ slideCount, currentSlide, onSlideChange }: CarouselIndicatorsProps) {
  console.log('CarouselIndicators rendering:', { slideCount, currentSlide });
  
  return (
    <div className="flex justify-center items-center gap-3">
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => {
            console.log('Clicked indicator:', index);
            onSlideChange(index);
          }}
          className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${
            index === currentSlide
              ? 'w-10 h-3 bg-[var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.8)]'
              : 'w-3 h-3 bg-[var(--color-beige)] hover:bg-[var(--color-gold)] hover:w-7 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentSlide ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}
