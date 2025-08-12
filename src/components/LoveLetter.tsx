// import React, { useState, useEffect } from 'react';
// import beanyLogo from '../assets/beany.png'

// const LoveLetter = () => {
//   const [currentSection, setCurrentSection] = useState(0);

//   const scrollToSection = (index:any) => {
//     const section = document.querySelector(`[data-section="${index}"]`);
//     section?.scrollIntoView({ behavior: 'smooth' });
//     setCurrentSection(index);
//   };

//   const HeartIcon = ({ size = "w-8 h-8" }) => (
//     <div className="inline-block animate-pulse">
//       <svg className={`${size} text-gray-800`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//       </svg>
//     </div>
//   );

//   const FlowerIcon = () => (
//     <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C21 10.1 20.1 11 19 11C17.9 11 17 10.1 17 9C17 7.9 17.9 7 19 7C20.1 7 21 7.9 21 9ZM7 9C7 10.1 6.1 11 5 11C3.9 11 3 10.1 3 9C3 7.9 3.9 7 5 7C6.1 7 7 7.9 7 9ZM17.5 17.5C18.3 18.3 18.3 19.7 17.5 20.5C16.7 21.3 15.3 21.3 14.5 20.5C13.7 19.7 13.7 18.3 14.5 17.5C15.3 16.7 16.7 16.7 17.5 17.5ZM9.5 17.5C10.3 18.3 10.3 19.7 9.5 20.5C8.7 21.3 7.3 21.3 6.5 20.5C5.7 19.7 5.7 18.3 6.5 17.5C7.3 16.7 8.7 16.7 9.5 17.5ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z"/>
//     </svg>
//   );

//   const StarIcon = () => (
//     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path d="M12 2L14.09 8.26L22 9.27L17 14.14L18.18 22.02L12 18.77L5.82 22.02L7 14.14L2 9.27L9.91 8.26L12 2Z"/>
//     </svg>
//   );

//   const BeanyIcon = () => (
//     <>
//     <div className='w-8'>

//           <img src={beanyLogo} className="logo react" alt="React logo" />
//     </div>
//     </>
//   )


//   // Layout 1: Center Layout (Hero) - Sketch Style
//   const CenterLayout = ({ sectionId, sectionIndex, title, subtitle, content, totalSections }:any) => (
//     <section
//       id={sectionId}
//       data-section={sectionIndex}
//       className="min-h-screen flex items-center justify-center px-8 py-16 bg-white relative overflow-hidden"
//     >
//       {/* Hand-drawn border frame */}
//       <div className="absolute inset-4 border-4 border-gray-800 rounded-3xl" 
//            style={{ 
//              borderStyle: 'solid',
//              borderImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0 Q25,5 50,0 T100,0 L100,100 Q75,95 50,100 T0,100 Z\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2\'/%3E%3C/svg%3E") 30',
//            }}></div>

//       {/* Scattered sketch elements */}
//       <div className="absolute top-20 left-20 animate-pulse opacity-60">
//         <FlowerIcon />
//       </div>
//       <div className="absolute top-32 right-24 animate-bounce opacity-40" style={{ animationDelay: '1s' }}>
//         <StarIcon />
//       </div>
//       <div className="absolute bottom-24 left-32 animate-pulse opacity-50" style={{ animationDelay: '2s' }}>
//         <HeartIcon size="w-6 h-6" />
//       </div>
//       <div className="absolute bottom-40 right-20 animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>
//         <FlowerIcon />
//       </div>

//       <div className="container mx-auto max-w-4xl relative z-20 text-center">
//         <div className="mb-12">
//           {/* Hand-drawn heart sketch */}
//           <div className="w-32 h-32 mx-auto mb-8 border-4 border-gray-800 rounded-full flex items-center justify-center relative bg-white shadow-lg"
//                style={{ 
//                  borderStyle: 'dashed',
//                  transform: 'rotate(-2deg)',
//                  boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
//                }}>
//             <HeartIcon size="w-16 h-16" />
//             {/* Sketch lines around heart */}
//             <div className="absolute -top-2 -left-2 w-2 h-2 border-t-2 border-l-2 border-gray-600"></div>
//             <div className="absolute -top-2 -right-2 w-2 h-2 border-t-2 border-r-2 border-gray-600"></div>
//             <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b-2 border-l-2 border-gray-600"></div>
//             <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b-2 border-r-2 border-gray-600"></div>
//           </div>
//         </div>

//         <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-800 relative"
//             style={{ 
//               fontFamily: 'Georgia, serif',
//               textShadow: '3px 3px 0px rgba(0,0,0,0.1)',
//               transform: 'rotate(-1deg)'
//             }}>
//           {title}
//           {/* Underline sketch */}
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-700 opacity-60"
//                style={{ transform: 'translateX(-50%) rotate(1deg)' }}></div>
//         </h1>

//         <h2 className="text-2xl md:text-3xl text-gray-700 mb-12 font-light italic relative"
//             style={{ transform: 'rotate(0.5deg)' }}>
//           {subtitle}
//           {/* Small decorative hearts */}
//           <HeartIcon size="w-4 h-4 absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-50" />
//           <HeartIcon size="w-4 h-4 absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-50" />
//         </h2>

//         {/* Paper note style content */}
//         <div className="bg-white border-4 border-gray-800 rounded-2xl p-12 relative shadow-lg"
//              style={{ 
//                borderStyle: 'solid',
//                transform: 'rotate(-0.5deg)',
//                boxShadow: '10px 10px 0px rgba(0,0,0,0.1)',
//                backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(0,0,0,0.1) 24px, rgba(0,0,0,0.1) 26px)'
//              }}>
//           {/* Torn paper effect */}
//           <div className="absolute -top-1 left-8 w-4 h-4 bg-white border-2 border-gray-800 rounded-full"></div>
//           <div className="absolute -top-1 right-8 w-4 h-4 bg-white border-2 border-gray-800 rounded-full"></div>
          
//           <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light"
//              style={{ fontFamily: 'Georgia, serif' }}>
//             {content}
//           </p>
//         </div>

//         <div className="mt-12 flex justify-center gap-6">
//           {sectionIndex < totalSections - 1 && (
//             <button
//               onClick={() => scrollToSection(sectionIndex + 1)}
//               className="px-10 py-5 bg-white border-4 border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold text-lg relative shadow-lg"
//               style={{ 
//                 borderStyle: 'solid',
//                 transform: 'rotate(-1deg)',
//                 boxShadow: '6px 6px 0px rgba(0,0,0,0.2)'
//               }}
//             //   onMouseEnter={(e) => e.target.style.transform = 'rotate(-1deg) scale(1.05)'}
//             //   onMouseLeave={(e) => e.target.style.transform = 'rotate(-1deg) scale(1)'}
//             >
//               Begin Reading →
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );

//   // Layout 2: Left Image, Right Content - Sketch Style
//   const LeftImageLayout = ({ sectionId, sectionIndex, title, subtitle, content, totalSections }:any) => (
//     <section
//       id={sectionId}
//       data-section={sectionIndex}
//       className="min-h-screen flex items-center justify-center px-8 py-16 bg-gray-50 relative"
//     >
//       {/* Sketched background elements */}
//       <div className="absolute inset-0 opacity-10">
//         {[...Array(20)].map((_, i) => (
//           <div key={i} 
//                className="absolute animate-pulse"
//                style={{
//                  left: `${Math.random() * 100}%`,
//                  top: `${Math.random() * 100}%`,
//                  animationDelay: `${Math.random() * 3}s`
//                }}>
//             <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//           </div>
//         ))}
//       </div>

//       <div className="container mx-auto max-w-6xl relative z-20">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           {/* Left Image - Sketch Frame */}
//           <div className="order-2 md:order-1">
//             <div className="relative">
//               {/* Polaroid-style sketch frame */}
//               <div className="w-full h-96 bg-white border-4 border-gray-800 shadow-lg p-4"
//                    style={{ 
//                      transform: 'rotate(-3deg)',
//                      borderStyle: 'solid',
//                      boxShadow: '12px 12px 0px rgba(0,0,0,0.1)'
//                    }}>
//                 <div className="w-full h-full border-2 border-gray-600 border-dashed flex items-center justify-center">
//                   <div className="text-center">
//                     <HeartIcon size="w-20 h-20" />
//                     <p className="text-gray-600 text-lg font-light mt-4" style={{ fontFamily: 'Georgia, serif' }}>
//                       Our beautiful memories
//                     </p>
//                   </div>
//                 </div>
//                 {/* Polaroid label area */}
//                 <div className="mt-4 text-center">
//                   <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
//                 </div>
//               </div>
//               {/* Tape corners */}
//               <div className="absolute -top-2 -left-2 w-8 h-6 bg-gray-300 border border-gray-500 opacity-80 transform rotate-12"></div>
//               <div className="absolute -top-2 -right-2 w-8 h-6 bg-gray-300 border border-gray-500 opacity-80 transform -rotate-12"></div>
//             </div>
//           </div>

//           {/* Right Content - Handwritten style */}
//           <div className="order-1 md:order-2 text-left">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 relative"
//                 style={{ 
//                   fontFamily: 'Georgia, serif',
//                   transform: 'rotate(-1deg)'
//                 }}>
//               {title}
//               {/* Handwritten underline */}
//               <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 300 20">
//                 <path d="M5,15 Q150,5 295,15" stroke="#374151" strokeWidth="3" fill="none" opacity="0.6"/>
//               </svg>
//             </h1>
//             <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-light italic"
//                 style={{ transform: 'rotate(0.5deg)' }}>
//               {subtitle}
//             </h2>
//             {/* Journal page style */}
//             <div className="bg-white border-l-4 border-gray-400 pl-8 pr-6 py-6 relative shadow-md"
//                  style={{ 
//                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 28px, rgba(0,0,0,0.1) 28px, rgba(0,0,0,0.1) 30px)',
//                    borderStyle: 'solid'
//                  }}>
//               {/* Red margin line */}
//               <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-400 opacity-60"></div>
//               <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-light"
//                  style={{ fontFamily: 'Georgia, serif' }}>
//                 {content}
//               </p>
//             </div>
//             <div className="mt-8 flex gap-4">
//               {sectionIndex > 0 && (
//                 <button
//                   onClick={() => scrollToSection(sectionIndex - 1)}
//                   className="px-6 py-3 bg-white border-3 border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium shadow-md"
//                   style={{ 
//                     borderStyle: 'solid',
//                     boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
//                   }}
//                 >
//                   ← Previous
//                 </button>
//               )}
//               {sectionIndex < totalSections - 1 && (
//                 <button
//                   onClick={() => scrollToSection(sectionIndex + 1)}
//                   className="px-6 py-3 bg-gray-800 border-3 border-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 font-medium shadow-md"
//                   style={{ 
//                     borderStyle: 'solid',
//                     boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
//                   }}
//                 >
//                   Next →
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   // Layout 3: Right Image, Left Content - Sketch Style
//   const RightImageLayout = ({ sectionId, sectionIndex, title, subtitle, content, totalSections }:any) => (
//     <section
//       id={sectionId}
//       data-section={sectionIndex}
//       className="min-h-screen flex items-center justify-center px-8 py-16 bg-white relative"
//     >
//       {/* Crosshatch background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <svg width="100%" height="100%">
//           <defs>
//             <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="20" height="20">
//               <path d="M0,20 L20,0" stroke="#374151" strokeWidth="0.5"/>
//               <path d="M0,0 L20,20" stroke="#374151" strokeWidth="0.5"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#crosshatch)"/>
//         </svg>
//       </div>

//       <div className="container mx-auto max-w-6xl relative z-20">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-left">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 relative"
//                 style={{ 
//                   fontFamily: 'Georgia, serif',
//                   transform: 'rotate(1deg)'
//                 }}>
//               {title}
//               {/* Sketchy circle around title */}
//               <svg className="absolute -inset-4 w-full h-full -z-10" viewBox="0 0 300 120">
//                 <ellipse cx="150" cy="60" rx="140" ry="50" stroke="#374151" strokeWidth="2" fill="none" opacity="0.3"
//                          strokeDasharray="5,3" transform="rotate(-2 150 60)"/>
//               </svg>
//             </h1>
//             <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-light italic"
//                 style={{ transform: 'rotate(-0.5deg)' }}>
//               {subtitle}
//             </h2>
//             {/* Notebook paper style */}
//             <div className="bg-yellow-50 border-2 border-gray-800 p-8 relative shadow-lg"
//                  style={{ 
//                    transform: 'rotate(-1deg)',
//                    borderStyle: 'dashed',
//                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(0,0,0,0.1) 24px, rgba(0,0,0,0.1) 26px)'
//                  }}>
//               {/* Spiral holes */}
//               <div className="absolute -left-1 top-8 w-3 h-3 bg-white border-2 border-gray-800 rounded-full"></div>
//               <div className="absolute -left-1 top-20 w-3 h-3 bg-white border-2 border-gray-800 rounded-full"></div>
//               <div className="absolute -left-1 top-32 w-3 h-3 bg-white border-2 border-gray-800 rounded-full"></div>
              
//               <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-light"
//                  style={{ fontFamily: 'Georgia, serif' }}>
//                 {content}
//               </p>
//             </div>
//             <div className="mt-8 flex gap-4">
//               {sectionIndex > 0 && (
//                 <button
//                   onClick={() => scrollToSection(sectionIndex - 1)}
//                   className="px-6 py-3 bg-white border-3 border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
//                   style={{ 
//                     borderStyle: 'solid',
//                     boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
//                   }}
//                 >
//                   ← Previous
//                 </button>
//               )}
//               {sectionIndex < totalSections - 1 && (
//                 <button
//                   onClick={() => scrollToSection(sectionIndex + 1)}
//                   className="px-6 py-3 bg-gray-800 border-3 border-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 font-medium"
//                   style={{ 
//                     borderStyle: 'solid',
//                     boxShadow: '4px 4px 0px rgba(0,0,0,0.3)'
//                   }}
//                 >
//                   Next →
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right Image - Sketch Style */}
//           <div className="relative">
//             <div className="w-full h-96 bg-white border-4 border-gray-800 shadow-lg p-6"
//                  style={{ 
//                    transform: 'rotate(2deg)',
//                    borderStyle: 'solid',
//                    boxShadow: '10px 10px 0px rgba(0,0,0,0.1)'
//                  }}>
//               <div className="w-full h-full border-2 border-gray-600 border-dotted flex items-center justify-center">
//                 <div className="text-center">
//                   <HeartIcon size="w-20 h-20" />
//                   <p className="text-gray-600 text-lg font-light mt-4" style={{ fontFamily: 'Georgia, serif' }}>
//                     What you mean to me
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Paper clips */}
//             <div className="absolute -top-4 left-1/4 w-6 h-12 bg-gray-400 rounded-lg border-2 border-gray-600 opacity-70"></div>
//             <div className="absolute -top-4 right-1/4 w-6 h-12 bg-gray-400 rounded-lg border-2 border-gray-600 opacity-70"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   // Layout 4: Stacked Card Layout - Sketch Style
//   const StackedLayout = ({ sectionId, sectionIndex, title, subtitle, content, totalSections }:any) => (
//     <section
//       id={sectionId}
//       data-section={sectionIndex}
//       className="min-h-screen flex items-center justify-center px-8 py-16 bg-gray-100 relative"
//     >
//       {/* Hand-drawn stars background */}
//       {[...Array(12)].map((_, i) => (
//         <div key={i} 
//              className="absolute animate-pulse opacity-20"
//              style={{
//                left: `${10 + (i % 4) * 25}%`,
//                top: `${15 + Math.floor(i / 4) * 25}%`,
//                animationDelay: `${i * 0.5}s`
//              }}>
//           <StarIcon />
//         </div>
//       ))}

//       <div className="container mx-auto max-w-4xl relative z-20 text-center">
//         {/* Top Image Card - Sketch Style */}
//         <div className="mb-8">
//           <div className="w-80 h-48 mx-auto bg-white border-4 border-gray-800 shadow-xl p-4"
//                style={{ 
//                  transform: 'rotate(-2deg)',
//                  borderStyle: 'solid',
//                  boxShadow: '8px 8px 0px rgba(0,0,0,0.15)'
//                }}>
//             <div className="w-full h-full border-2 border-gray-600 border-dashed flex items-center justify-center">
//               <div className="text-center">
//                 <HeartIcon size="w-16 h-16" />
//                 <p className="text-gray-600 font-light mt-2" style={{ fontFamily: 'Georgia, serif' }}>
//                   Our future dreams
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Title Card - Hand-drawn style */}
//         <div className="mb-8 bg-white border-4 border-gray-800 p-8 relative shadow-xl"
//              style={{ 
//                transform: 'rotate(1deg)',
//                borderStyle: 'solid',
//                boxShadow: '6px 6px 0px rgba(0,0,0,0.2)'
//              }}>
//           {/* Corner decorations */}
//           <div className="absolute top-2 left-2">
//             <FlowerIcon />
//           </div>
//           <div className="absolute top-2 right-2">
//             <FlowerIcon />
//           </div>
//           <div className="absolute bottom-2 left-2">
//             <StarIcon />
//           </div>
//           <div className="absolute bottom-2 right-2">
//             <StarIcon />
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
//               style={{ fontFamily: 'Georgia, serif' }}>
//             {title}
//           </h1>
//           <h2 className="text-lg md:text-xl text-gray-600 font-light italic">
//             {subtitle}
//           </h2>
//         </div>

//         {/* Content Card - Journal style */}
//         <div className="mb-8 bg-yellow-50 border-4 border-gray-800 p-10 shadow-xl"
//              style={{ 
//                transform: 'rotate(-1deg)',
//                borderStyle: 'double',
//                backgroundImage: 'repeating-linear-gradient(transparent, transparent 26px, rgba(0,0,0,0.1) 26px, rgba(0,0,0,0.1) 28px)'
//              }}>
//           <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-light"
//              style={{ fontFamily: 'Georgia, serif' }}>
//             {content}
//           </p>
//         </div>

//         <div className="flex justify-center gap-6">
//           {sectionIndex > 0 && (
//             <button
//               onClick={() => scrollToSection(sectionIndex - 1)}
//               className="px-8 py-4 bg-white border-4 border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
//               style={{ 
//                 borderStyle: 'solid',
//                 boxShadow: '5px 5px 0px rgba(0,0,0,0.2)'
//               }}
//             >
//               ← Previous
//             </button>
//           )}
//           {sectionIndex < totalSections - 1 && (
//             <button
//               onClick={() => scrollToSection(sectionIndex + 1)}
//               className="px-8 py-4 bg-gray-800 border-4 border-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 font-medium"
//               style={{ 
//                 borderStyle: 'solid',
//                 boxShadow: '5px 5px 0px rgba(0,0,0,0.3)'
//               }}
//             >
//               Next →
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );

//   // Layout 5: Full Width with Centered Content - Letter Style
//   const FullWidthLayout = ({ sectionId, sectionIndex, title, subtitle, content, totalSections }:any) => (
//     <section
//       id={sectionId}
//       data-section={sectionIndex}
//       className="min-h-screen flex items-center justify-center px-8 py-16 bg-gray-50 relative"
//     >
//       {/* Letter paper background */}
//       <div className="absolute inset-8 bg-white border-2 border-gray-400 shadow-2xl"
//            style={{ 
//              backgroundImage: 'repeating-linear-gradient(transparent, transparent 28px, rgba(0,0,0,0.1) 28px, rgba(0,0,0,0.1) 30px)',
//            }}>
//         {/* Holes for binder */}
//         <div className="absolute left-6 top-12 w-4 h-4 bg-gray-50 border-2 border-gray-400 rounded-full"></div>
//         <div className="absolute left-6 top-24 w-4 h-4 bg-gray-50 border-2 border-gray-400 rounded-full"></div>
//         <div className="absolute left-6 top-36 w-4 h-4 bg-gray-50 border-2 border-gray-400 rounded-full"></div>
//         {/* Red margin line */}
//         <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-400"></div>
//       </div>

//       <div className="container mx-auto max-w-5xl relative z-20 text-center">
//         <div className="px-12">
//           <div className="flex justify-center mb-8">
//             <div className="w-24 h-24 border-4 border-gray-800 rounded-full flex items-center justify-center shadow-lg bg-white"
//                  style={{ borderStyle: 'dashed' }}>
//               <HeartIcon size="w-12 h-12" />
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 relative"
//               style={{ fontFamily: 'Georgia, serif' }}>
//             {title}
//             {/* Hand-drawn heart doodles */}
//             <HeartIcon size="w-8 h-8 absolute -left-12 top-4 opacity-60" />
//             <HeartIcon size="w-6 h-6 absolute -right-8 top-2 opacity-40" />
//           </h1>

//           <h2 className="text-xl md:text-2xl text-gray-600 mb-10 font-light italic">
//             {subtitle}
//           </h2>

//           {/* Final letter content box */}
//           <div className="bg-white border-4 border-gray-800 p-8 mb-10 relative shadow-xl"
//                style={{ 
//                  borderStyle: 'double',
//                  transform: 'rotate(-0.5deg)',
//                  boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
//                }}>
//             {/* Wax seal effect */}
//             <div className="absolute -top-4 right-8 w-8 h-8 bg-red-600 rounded-full border-2 border-red-800 flex items-center justify-center">
//               <HeartIcon size="w-4 h-4 text-white" />
//             </div>
            
//             <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light"
//                style={{ fontFamily: 'Georgia, serif' }}>
//               {content}
//             </p>
            
//             {/* Signature line */}
//             <div className="mt-8 text-right">
//               <div className="inline-block">
//                 <div className="w-32 h-0.5 bg-gray-600 mb-2"></div>
//                 <p className="text-gray-600 italic font-light">With all my love ♡</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center gap-6">
//             {sectionIndex > 0 && (
//               <button
//                 onClick={() => scrollToSection(sectionIndex - 1)}
//                 className="px-8 py-4 bg-white border-4 border-gray-800 text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
//                 style={{ 
//                   borderStyle: 'solid',
//                   boxShadow: '5px 5px 0px rgba(0,0,0,0.2)'
//                 }}
//               >
//                 ← Previous
//               </button>
//             )}
//             <button
//               onClick={() => scrollToSection(0)}
//               className="px-8 py-4 bg-gray-800 border-4 border-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 font-medium"
//               style={{ 
//                 borderStyle: 'solid',
//                 boxShadow: '5px 5px 0px rgba(0,0,0,0.3)'
//               }}
//             >
//               Back to Start ♡
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   const totalSections = 5;

//   return (
//     <div className="relative min-h-screen bg-gray-100 font-serif">
//       {/* Navigation Dots - Sketch Style */}
//       <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-6">
//         {[...Array(totalSections)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => scrollToSection(index)}
//             className={`w-5 h-5 border-3 border-gray-800 transition-all duration-300 hover:scale-125 relative ${
//               currentSection === index
//                 ? 'bg-gray-800'
//                 : 'bg-white hover:bg-gray-200'
//             }`}
//             style={{ 
//               borderRadius: '50%',
//               borderStyle: 'solid',
//               boxShadow: '2px 2px 0px rgba(0,0,0,0.3)'
//             }}
//           >
//             {currentSection === index && (
//               <div className="absolute -inset-1 border-2 border-gray-600 rounded-full border-dashed animate-spin" 
//                    style={{ animationDuration: '8s' }}></div>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Floating Sketch Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-bounce opacity-20"
//             style={{
//               left: `${10 + i * 15}%`,
//               top: `${20 + (i % 3) * 25}%`,
//               animationDelay: `${i * 0.8}s`,
//               animationDuration: '4s'
//             }}
//           >
//             {i % 3 === 0 ? <BeanyIcon/> : 
//              i % 3 === 1 ? <FlowerIcon /> : <StarIcon />}
//           </div>
//         ))}
//       </div>

//       {/* Sketch-themed Section Components */}
//       <CenterLayout
//         sectionId="hero"
//         sectionIndex={0}
//         title=""
//         subtitle="A letter from my heart to yours"
//         content="Every love story is beautiful, but ours is my favorite. You light up my world in ways I never thought possible, and every day with you feels like a dream come true."
//         totalSections={totalSections}
//       />

//       <LeftImageLayout
//         sectionId="memories"
//         sectionIndex={1}
//         title="Our Beautiful Memories"
//         subtitle="Moments that make my heart skip"
//         content="From our first glance to every laugh we've shared, each memory with you is a treasure I hold close to my heart. You make ordinary moments feel magical, and every second spent with you becomes a cherished memory that I'll treasure forever."
//         totalSections={totalSections}
//       />

//       <RightImageLayout
//         sectionId="feelings"
//         sectionIndex={2}
//         title="What You Mean to Me"
//         subtitle="Words from my soul"
//         content="You are my sunshine on cloudy days, my peace in chaos, and my greatest adventure. With you, I've discovered a love I never knew existed. You complete me in every way possible, and I can't imagine my life without your beautiful smile and loving heart."
//         totalSections={totalSections}
//       />

//       <StackedLayout
//         sectionId="future"
//         sectionIndex={3}
//         title="Our Future Together"
//         subtitle="Dreams we'll chase hand in hand"
//         content="I dream of all the tomorrows we'll share - traveling the world, building our home, creating new memories, and growing old together. You are my forever, my always, my everything. Every plan I make includes you, because you are my future."
//         totalSections={totalSections}
//       />

//       <FullWidthLayout
//         sectionId="promise"
//         sectionIndex={4}
//         title="My Promise to You"
//         subtitle="With all my love, always and forever"
//         content="I promise to love you in all your seasons, support your dreams, hold you close during storms, and celebrate every victory with you. You have my heart, today, tomorrow, and for all eternity. This is my vow, my commitment, my love letter to you."
//         totalSections={totalSections}
//       />
//     </div>
//   );
// };

// export default LoveLetter;