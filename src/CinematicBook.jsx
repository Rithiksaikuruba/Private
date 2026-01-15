import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Loader2, Quote, Sparkles, Heart, RotateCcw } from 'lucide-react';

// --- CONFIGURATION ---
const TYPING_SPEED = 35; // Smooth reading speed
const AUTO_PLAY_DURATION = 35000; // Longer duration for reading large text

// --- CONTENT DATA (STRICTLY PRESERVED) ---
const MEMORIES = [
  { 
    file: '/memories/the-poster.jpeg', 
    caption: 'The Beginning', 
    date: 'Chapter I', 
    subtext: 'Where it all started'
  },
  { 
    file: '/memories/the-first-glance.jpg', 
    caption: 'The First Glance', 
    date: 'October 29, 2024.', 
    subtext: 'In the blink of an eye',
    description: "It was just a normal day… until I saw her. I saw Harini for the first time in a selfie—she was standing beside Rajini, our common friend. But the moment my eyes met her smile on that screen, something inside me changed. I didn’t know her. I had never spoken to her. Yet… my heart reacted before my mind could. I felt something special. Something I couldn’t explain. I immediately asked Rajini to introduce her to me. But she refused. And just like that, the distance remained. Days passed, but Harini stayed in my thoughts. Later, I found out she had danced on Freshers’ Day. I somehow collected her pictures—not for showing anyone, not for posting— but for one simple reason: I wanted to see her in real life. Finally, on December 21, 2024, I gathered all my courage and went to meet her. And the moment I saw her live… I was blown away. She was far more beautiful than any picture. My legs were shaking. My heart was racing. I felt nervous, silent, frozen. That moment… without a single word exchanged… without her even knowing… I fell in love with her. That was the beginning. Before conversations. Before friendship. Before love was spoken. Just one glance… and my story had already started.."
  },
  { 
    file: '/memories/the-anna-moment.jpeg', 
    caption: 'The Anna Moment', 
    date: 'Unforgettable', 
    subtext: 'Time stood still',
    description: "A few days after meeting her, I went to her again— this time with another reason, another excuse— to share some of the pictures I had collected. I was happy. I was excited. I finally got a chance to talk to her again. Then she smiled… looked at me… and called me: “Anna.” That single word hit me harder than I expected. I knew she was my junior. I knew she meant no harm. But my heart wasn’t ready to hear that word from her. I felt disappointed. Silent pain settled inside me. I smiled on the outside… but something inside me broke a little. Days passed. When I met her again, I finally gathered courage and said it gently: “Don’t call me anna. It’s okay… just because I’m your senior, you don’t have to call me that.” She listened. She understood. And she said okay. That small moment gave me relief. My heart felt lighter. Hope returned quietly. After that, I sent her an Instagram request. But fate had its own timing. She had semester exams, then festival holidays— and a long one-month gap passed without anything happening. No talks. No messages. Just waiting… and thinking about her every single day. The story wasn’t moving forward yet— but my feelings already were."
  },
  { 
    file: '/memories/frontend-fusion-silent-disappointment.jpeg', 
    caption: 'Frontend Fusion', 
    date: 'Silent Chaos', 
    subtext: 'Growing through the noise',
    description: "Time passed. While she was busy with exams and holidays, I was busy thinking about one thing— how to see her again. Then the opportunity came. Our college fest was about to happen. I didn’t just wait for fate this time. I created my own reason. I decided to conduct a technical event— “Frontend Fusion.” Not just for the fest. Not just for the certificate. But for her. When I went to announce the event in her class, I saw many girls reacting, smiling, whispering. Some of them had crushes on me. They talked about me. They discussed me. And Harini… she listened quietly. She liked the event. She registered for it. My heart felt full. Everything felt worth it. Her friends talked to her about me. They asked her opinion. They even said: “You’ll win the award for the event he’s conducting.” But Harini was different. She was an introvert. All this attention made her uncomfortable. The whispers, the focus, the expectations— It was too much. When I went to her class again for another announcement, I found out… She had cancelled her registration. That moment crushed me. I had planned everything. I had conducted everything. I had created an entire event… Just to see her. Just to meet her again. And now… she wasn’t coming. I felt disappointed. Empty. Lost. I asked myself silently: “If she’s not coming… what’s the point of all this?” But even in disappointment, my feelings for her didn’t fade. They only became deeper."
  },
  { 
    file: '/memories/the-honest-talk.jpeg', 
    caption: 'The Honest Talk', 
    date: 'Vulnerability', 
    subtext: 'Walls coming down',
    description: "Days passed. The disappointment stayed with me, but I couldn’t carry it silently anymore. One day, as Harini walked past me with her friend, I stopped her. I called her name. “Harini… I want to talk.” My heart was pounding, but I spoke honestly—without drama, without expectations. I said: “Harini, listen… I don’t even know you personally. How can I love you? All those things you heard… they’re just rumours. I only wanted to be friends. Let’s just be friends.” She listened quietly. Then she said okay. That one word changed everything. I went home that day and removed my unaccepted Instagram request. After some time, I sent it again. She didn’t accept. I sent it once more. And this time… she accepted. That small notification felt like a new beginning. Slowly, our conversations started. At first, she was not very open. She ignored sometimes. She stayed distant. But days passed. And without realizing it, we became good friends."
  },
  { 
    file: '/memories/five-hour-calls-falling-deeper.jpeg', 
    caption: 'Five Hour Calls', 
    date: 'Falling Deeper', 
    subtext: '300 minutes of us',
    description: "Friendship slowly turned into comfort. I asked for her number. She gave it. Calls began. At first, they were short. Then longer. Then… endless. We started talking for five hours a day. Every call felt special. Every conversation felt needed. She talked about her whole life— her past, her thoughts, her worries, her dreams. I listened. I cared. I understood. With every word she shared, I fell in love with her even more deeply. One day, I finally told her the truth. I said I had a crush on her. She replied honestly: “We are just friends. I don’t want all this.” She denied it. She asked to stop that kind of talk. But even after saying that… She couldn’t stop talking to me. We had become so close that her day felt incomplete without me. And mine felt the same. I stayed. I respected her feelings. But my love only grew stronger— quietly, patiently."
  },
  { 
    file: '/memories/my-ears-are-broke.jpeg', 
    caption: 'Worth The Pain', 
    date: 'Listening', 
    subtext: 'Every word mattered',
    description: "One day… I couldn’t hold it inside anymore. On a call, with my heart racing, I finally said the words I had been carrying for so long: “I love you.” There was silence. Then she spoke. “My ears are broke.” She was shocked. Completely. She said: “No one has ever said this to me before. Why did you say that?” I could feel how unexpected it was for her. She knew everything about me— my nature, my intentions, my respect. Slowly, things changed. She started seeing me differently. She began calling me a gentleman. Our conversations became warmer. Softer. More caring. There was no official answer yet… but there was something beautiful growing between us. Not loud. Not rushed. Just two hearts slowly understanding each other."
  },
  { 
    file: '/memories/the-yes.jpeg', 
    caption: 'She Said Yes', 
    date: 'Forever', 
    subtext: 'The easiest question',
    description: "Time passed with soft conversations and growing warmth. Then came the day. April 4, 2025. I gathered all my courage once again and proposed to her. This time… she didn’t hesitate. She said: “Yes.” That single word made everything feel unreal. All the waiting, the patience, the silence— it was finally worth it. On April 15, I gave her a ring. I gently placed it on her finger. She looked at it. She smiled. She blushed. Her happiness was impossible to hide. And seeing her like that made my heart feel full. This wasn’t just a proposal anymore. This was a promise."
  },
  { 
    file: '/memories/the-first-date.jpeg', 
    caption: 'The First Date', 
    date: 'New Start', 
    subtext: 'Day one of forever',
    description: "April 20, 2025. Our first date. Two people who started as strangers, now walking together— hands slowly finding each other. There was nervousness. There was excitement. There were smiles that didn’t fade. We spent time together, talking, laughing, sharing silence. At one moment, I gently kissed her on the cheek. She blushed. I blushed. We hugged— a warm, quiet hug that felt safe and real. We walked holding hands, not caring about the world around us. That day wasn’t loud or dramatic. It was simple. Pure. Full of love. From the first glance… to this moment… This wasn’t just a love story anymore. It was ours."
  },
];

// --- ANIMATION VARIANTS ---
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 30 },
      opacity: { duration: 0.6 },
      scale: { duration: 0.6 }
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 30 },
      opacity: { duration: 0.5 }
    }
  })
};

const textReveal = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom) => ({ 
        opacity: 1, 
        y: 0,
        transition: { delay: custom * 0.15 + 0.3, duration: 1, ease: "easeOut" }
    })
};

// --- TYPEWRITER COMPONENT ---
function TypewriterText({ text, isActive }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);
        if (!isActive) return;

        let index = 0;
        const intervalId = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(intervalId);
            }
        }, TYPING_SPEED);

        return () => clearInterval(intervalId);
    }, [text, isActive]);

    return (
        <div ref={containerRef} className="relative">
            <p className="
                text-white/90 
                text-[18px] sm:text-[20px] md:text-[26px] 
                leading-[1.8] md:leading-relaxed
                font-sans font-medium tracking-wide 
                text-left
            ">
                {displayedText}
                {!isComplete && isActive && (
                    <span className="inline-block w-[2px] h-[20px] md:h-[30px] bg-amber-500 ml-1 animate-pulse align-middle" />
                )}
            </p>
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function CinematicStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [viewState, setViewState] = useState('start-message'); 
  const [loaded, setLoaded] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef(null);

  // --- PRELOADING ---
  useEffect(() => {
    const preloadImages = async () => {
      const promises = MEMORIES.map((memory) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = memory.file;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(promises);
      setLoaded(true);
    };
    preloadImages();
  }, []);

  // --- START MESSAGE TIMER ---
  useEffect(() => {
    if (viewState === 'start-message') {
        const timer = setTimeout(() => {
            setViewState('intro');
        }, 5000); 
        return () => clearTimeout(timer);
    }
  }, [viewState]);

  const startStory = () => {
    setViewState('playing');
  };

  const replay = () => {
    setViewState('playing');
    setCurrentIndex(0);
  };

  // --- NAVIGATION ---
  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex >= MEMORIES.length) {
          setViewState('end-message');
          return prev;
      }
      if (nextIndex < 0) return MEMORIES.length - 1;
      return nextIndex;
    });
  }, []);

  const jumpTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setAutoPlay(false);
  }

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
    if (autoPlay && viewState === 'playing') {
        autoPlayRef.current = setInterval(() => {
            paginate(1);
        }, AUTO_PLAY_DURATION);
    } else {
        clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, viewState, paginate]);

  // --- KEYBOARD & GESTURES ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewState !== 'playing') return;
      if (e.key === 'ArrowRight') { paginate(1); setAutoPlay(false); }
      if (e.key === 'ArrowLeft') { paginate(-1); setAutoPlay(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, paginate]);

  // Swipe logic
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // --- RENDER STATES ---
  if (viewState === 'start-message') {
    return <StartMessage />;
  }

  if (viewState === 'intro') {
    return <IntroScreen loaded={loaded} onStart={startStory} />;
  }

  if (viewState === 'end-message') {
      return <EndMessage onReplay={replay} />;
  }

  const currentMemory = MEMORIES[currentIndex];

  // --- MAIN STORY RENDER ---
  return (
    <div className="h-[100dvh] w-full bg-[#050505] relative overflow-hidden flex flex-col font-sans select-none text-white">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- FLOATING PARTICLES --- */}
      <ParticleBackground />

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000">
        <AnimatePresence mode='wait'>
            <motion.div 
                key={currentMemory.file + "bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 }}
                className="absolute inset-0 bg-cover bg-center blur-[120px] scale-125"
                style={{ backgroundImage: `url(${currentMemory.file})` }}
            />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-soft-light" />
      </div>

      {/* --- TOP BAR --- */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-50">
        <div className="max-w-7xl mx-auto w-full">
            {/* Progress Line */}
            <div className="flex gap-2 mb-6 group/progress">
                {MEMORIES.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => jumpTo(idx)}
                    className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer hover:h-1.5 transition-all duration-300"
                >
                    <motion.div 
                        className="h-full bg-amber-400/90 box-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                        initial={{ width: "0%" }}
                        animate={{ width: idx < currentIndex ? "100%" : idx === currentIndex ? "100%" : "0%" }}
                        transition={{ duration: idx === currentIndex && autoPlay ? AUTO_PLAY_DURATION / 1000 : 0.5, ease: "linear" }}
                        style={{ boxShadow: idx === currentIndex ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none' }}
                    />
                </button>
                ))}
            </div>

            {/* Header Info */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 mb-1 font-medium">
                        Chapter {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                </div>
                
                <div className="flex gap-3">
                     {/* Auto Play Toggle */}
                    <button 
                        onClick={() => setAutoPlay(!autoPlay)}
                        className={`group p-3 rounded-full backdrop-blur-md transition-all border ${autoPlay ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        title="Watch Mode"
                    >
                        {autoPlay ? <Pause size={18} className="text-amber-200" /> : <Play size={18} className="text-white/80 group-hover:text-white" />}
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- MAIN STAGE --- */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-0 md:p-8 lg:p-12">
        
        {/* Desktop Controls */}
        <div className="hidden md:flex absolute inset-x-8 justify-between z-50 pointer-events-none max-w-[95rem] mx-auto">
          <ControlButton onClick={() => { paginate(-1); setAutoPlay(false); }} icon={<ChevronLeft size={32} />} />
          <ControlButton onClick={() => { paginate(1); setAutoPlay(false); }} icon={<ChevronRight size={32} />} />
        </div>

        {/* THE CARD */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
                setAutoPlay(false);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
                setAutoPlay(false);
              }
            }}
            className="w-full h-full md:max-w-[95rem] md:h-[85vh] flex flex-col md:flex-row bg-[#050505] md:bg-black/60 md:backdrop-blur-3xl md:border md:border-white/10 md:rounded-[32px] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] overflow-hidden relative"
          >
            {/* Grain Overlay on Card */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0 mix-blend-overlay" />
            
            {/* IMAGE SECTION - SMALLER ON MOBILE FOR MORE TEXT SPACE */}
            <div className="relative w-full h-[25vh] md:w-[40%] md:h-full bg-black shrink-0 overflow-hidden border-b border-white/10 md:border-b-0 md:border-r">
                <motion.img
                  src={currentMemory.file}
                  alt={currentMemory.caption}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Desktop Gradient Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#050505] z-10" />
                {/* Mobile Gradient Overlay */}
                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />

                {/* Mobile Header Inside Image Area to save space */}
                <div className="md:hidden absolute bottom-4 left-6 z-20">
                     <h2 className="text-3xl font-serif text-white leading-none tracking-tight drop-shadow-lg">
                        {currentMemory.caption}
                    </h2>
                     <div className="flex items-center gap-2 text-amber-400/80 text-[10px] font-medium tracking-widest uppercase mt-2">
                        <Sparkles size={10} />
                        {currentMemory.subtext}
                    </div>
                </div>
            </div>

            {/* TEXT SECTION - LARGER AREA */}
            <div className="
                relative flex-1 
                flex flex-col 
                overflow-hidden
                bg-[#050505]
            ">
               {/* Decorative Quote */}
               <div className="absolute top-6 right-6 opacity-[0.05] pointer-events-none">
                 <Quote size={120} className="fill-white" />
               </div>

               <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-16 relative z-10">
                  <div className="max-w-4xl mx-auto md:mx-0 pt-2 md:pt-6">
                    
                    {/* Desktop Header Group (Hidden on Mobile) */}
                    <div className="hidden md:block">
                        <motion.div variants={textReveal} custom={1} initial="hidden" animate="visible">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="h-[1px] w-8 bg-amber-400/50" />
                                <span className="text-amber-400/90 text-sm font-semibold tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                                    {currentMemory.date}
                                </span>
                            </div>
                            
                            <h2 className="text-6xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 leading-[1.1] tracking-tight mb-4">
                                {currentMemory.caption}
                            </h2>
                            
                            <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-widest uppercase mb-12 pl-1">
                                <Sparkles size={12} className="text-amber-400/60" />
                                {currentMemory.subtext}
                            </div>
                        </motion.div>
                    </div>

                    {/* Description Body - OPTIMIZED FOR MOBILE READING */}
                    <div className="min-h-[200px] mb-8">
                       <TypewriterText text={currentMemory.description} isActive={true} />
                    </div>

                    {/* Extra padding at bottom for scrolling */}
                    <div className="h-32" />
                  </div>
               </div>

               {/* Scroll Mask */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-20" />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function StartMessage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden"
        >
             <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             
             <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="z-10 text-center px-8"
             >
                <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 tracking-wide leading-tight drop-shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                    Hi Kunnu<br/>
                    <span className="text-xl md:text-3xl text-white/70 font-light mt-6 block tracking-[0.2em] font-sans uppercase">this is for you</span>
                </h1>
             </motion.div>
        </motion.div>
    )
}

function EndMessage({ onReplay }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
        >
             <ParticleBackground />
             <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             
             {/* Background glow pulse */}
             <motion.div 
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent"
             />

             <motion.div 
                initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="z-10 text-center px-6 max-w-4xl"
             >
                <div className="mb-8">
                    <Heart className="w-12 h-12 text-red-500 mx-auto fill-red-500 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                </div>

                <h1 className="text-5xl md:text-7xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-700 leading-tight mb-8 drop-shadow-[0_0_35px_rgba(251,191,36,0.4)]">
                    Happy Birthday<br/>Kunnu Bangaram
                </h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-xl md:text-3xl text-white/90 font-serif italic tracking-wide"
                >
                    and I Love You Kanna
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="mt-16"
                >
                    <button 
                        onClick={onReplay}
                        className="flex items-center gap-2 mx-auto text-white/30 hover:text-white transition-colors text-sm uppercase tracking-widest"
                    >
                        <RotateCcw size={14} /> Replay
                    </button>
                </motion.div>
             </motion.div>
        </motion.div>
    )
}

function ControlButton({ onClick, icon }) {
    return (
        <button 
            onClick={onClick}
            className="pointer-events-auto p-4 rounded-full text-white/40 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl border border-white/5 hover:border-white/20 shadow-lg group bg-black/20"
        >
            <span className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                {icon}
            </span>
        </button>
    )
}

function ParticleBackground() {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 10,
        size: Math.random() * 2 + 1
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ 
                        opacity: [0, 0.4, 0], 
                        y: -150, 
                        x: Math.random() * 60 - 30 
                    }}
                    transition={{ 
                        duration: p.duration, 
                        repeat: Infinity, 
                        ease: "linear", 
                        delay: p.delay 
                    }}
                    className="absolute bg-amber-200/30 rounded-full blur-[1px]"
                    style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
                />
            ))}
        </div>
    )
}

function IntroScreen({ loaded, onStart }) {
    return (
      <div className="h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-[#050505] to-[#050505]" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center relative px-6"
        >
            <div className="mb-14 relative">
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" 
                />
                
                <span className="text-amber-500/70 text-[11px] tracking-[0.5em] uppercase font-medium font-sans">
                    A Digital Memory
                </span>
                
                <h1 className="text-7xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-tighter leading-[0.9] mt-6 mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    Our<br/>Story
                </h1>

                <p className="text-white/40 font-serif italic text-xl">Rithik And Harini</p>
            </div>
          
          <div className="h-24 flex items-center justify-center">
            {loaded ? (
                <motion.button 
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="group relative px-12 py-4 overflow-hidden rounded-full bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(251,191,36,0.2)]"
                >
                <div className="relative flex items-center gap-4">
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white/90 group-hover:text-white transition-colors">Begin Journey</span>
                    <Play size={10} className="fill-white/90 group-hover:fill-amber-400 transition-colors" />
                </div>
                </motion.button>
            ) : (
                <div className="flex flex-col items-center gap-4 text-white/30">
                <Loader2 className="animate-spin w-6 h-6 text-amber-500/50" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Loading Memories...</span>
                </div>
            )}
          </div>
        </motion.div>
      </div>
    );
}