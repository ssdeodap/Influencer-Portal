import React, { useState, useLayoutEffect, useRef } from 'react';
import { CloseIcon } from './icons';
import Button from './common/Button';
import { Page } from '../App';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface TourStep {
  elementId: string;
  title: string;
  content: string;
  position: Position;
  navigateTo?: Page;
}

const tourSteps: TourStep[] = [
  {
    elementId: 'tour-step-1',
    title: 'Navigation Menu',
    content: 'Use the sidebar to navigate between different sections of your portal.',
    position: 'right',
  },
  {
    elementId: 'tour-step-2',
    title: 'Recent Activity',
    content: "This is where you can quickly see the latest updates on your applications and collaborations.",
    position: 'bottom',
    navigateTo: 'My Collaborations',
  },
  {
    elementId: 'tour-step-collaborations',
    title: 'Collaboration Hub',
    content: 'Browse, filter, and manage your collaborations right from this page. Now, let\'s check your performance.',
    position: 'bottom',
    navigateTo: 'Analytics',
  },
   {
    elementId: 'tour-step-analytics',
    title: 'Your Analytics',
    content: 'Track your growth and performance across all your accounts. Finally, let\'s see your profile.',
    position: 'top',
    navigateTo: 'Profile',
  },
  {
    elementId: 'tour-step-profile',
    title: 'Manage Your Profile',
    content: 'Keep your personal and professional details up-to-date here to attract the best brands!',
    position: 'bottom',
  },
];

const OnboardingTutorial: React.FC<{ onClose: () => void; setCurrentPage: (page: Page) => void; }> = ({ onClose, setCurrentPage }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({});
  const [popoverStyle, setPopoverStyle] = useState({});
  const [arrowPosition, setArrowPosition] = useState<Position>('top');
  const popoverRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    const currentStep = tourSteps[stepIndex];
    const element = document.getElementById(currentStep.elementId);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        const rect = element.getBoundingClientRect();
        
        setHighlightStyle({
            width: `${rect.width + 16}px`,
            height: `${rect.height + 16}px`,
            top: `${rect.top - 8}px`,
            left: `${rect.left - 8}px`,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease-in-out',
        });

        const popoverHeight = popoverRef.current?.offsetHeight || 200;
        const popoverWidth = popoverRef.current?.offsetWidth || 300;
        const gap = 15;
        const padding = 20;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        const positionPreference: Position[] = [currentStep.position, 'bottom', 'top', 'right', 'left'];
        let bestPosition: Position = 'bottom';
        for (const pos of positionPreference) {
            if (pos === 'top' && (rect.top - popoverHeight - gap > padding)) { bestPosition = pos; break; }
            if (pos === 'bottom' && (rect.bottom + popoverHeight + gap < windowHeight - padding)) { bestPosition = pos; break; }
            if (pos === 'left' && (rect.left - popoverWidth - gap > padding)) { bestPosition = pos; break; }
            if (pos === 'right' && (rect.right + popoverWidth + gap < windowWidth - padding)) { bestPosition = pos; break; }
        }
        
        setArrowPosition(bestPosition);

        let popoverTop = 0, popoverLeft = 0;
        switch(bestPosition) {
            case 'top':
                popoverTop = rect.top - popoverHeight - gap;
                popoverLeft = rect.left + rect.width / 2 - popoverWidth / 2;
                break;
            case 'bottom':
                popoverTop = rect.bottom + gap;
                popoverLeft = rect.left + rect.width / 2 - popoverWidth / 2;
                break;
            case 'left':
                popoverTop = rect.top + rect.height / 2 - popoverHeight / 2;
                popoverLeft = rect.left - popoverWidth - gap;
                break;
            case 'right':
                popoverTop = rect.top + rect.height / 2 - popoverHeight / 2;
                popoverLeft = rect.right + gap;
                break;
        }
        
        const correctedLeft = Math.max(padding, Math.min(popoverLeft, window.innerWidth - popoverWidth - padding));
        const correctedTop = Math.max(padding, Math.min(popoverTop, window.innerHeight - popoverHeight - padding));

        setPopoverStyle({
            top: `${correctedTop}px`,
            left: `${correctedLeft}px`,
            transition: 'opacity 0.3s ease-in-out, top 0.3s ease-in-out, left 0.3s ease-in-out',
            opacity: 1,
        });
    }
  };

  useLayoutEffect(() => {
    setPopoverStyle({ opacity: 0 });
    const timer = setTimeout(calculatePosition, 150);
    window.addEventListener('resize', calculatePosition);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePosition);
    };
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex < tourSteps.length - 1) {
      const nextStep = tourSteps[stepIndex + 1];
      if (nextStep.navigateTo) {
        setCurrentPage(nextStep.navigateTo);
      }
      setStepIndex(stepIndex + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrev = () => {
    if (stepIndex > 0) {
      const prevStepIndex = stepIndex - 1;
      let targetPage: Page = 'Dashboard';
      for(let i = prevStepIndex; i >= 0; i--) {
        if(tourSteps[i].navigateTo) {
          targetPage = tourSteps[i].navigateTo!;
          break;
        }
      }
      if (prevStepIndex === 0) targetPage = 'Dashboard';
      
      if (tourSteps[stepIndex].navigateTo !== targetPage) {
        setCurrentPage(targetPage);
      }
      setStepIndex(prevStepIndex);
    }
  }

  const currentStep = tourSteps[stepIndex];
  
  const getArrowStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = { position: 'absolute', width: 0, height: 0, borderStyle: 'solid' };
    switch (arrowPosition) {
        case 'top': return {...baseStyles, borderWidth: '10px 10px 0 10px', borderColor: 'white transparent transparent transparent', bottom: '-10px', left: 'calc(50% - 10px)' };
        case 'bottom': return {...baseStyles, borderWidth: '0 10px 10px 10px', borderColor: 'transparent transparent white transparent', top: '-10px', left: 'calc(50% - 10px)' };
        case 'left': return {...baseStyles, borderWidth: '10px 0 10px 10px', borderColor: 'transparent transparent transparent white', right: '-10px', top: 'calc(50% - 10px)' };
        case 'right': return {...baseStyles, borderWidth: '10px 10px 10px 0', borderColor: 'transparent white transparent transparent', left: '-10px', top: 'calc(50% - 10px)' };
        default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute rounded-lg border-2 border-dashed border-white" style={highlightStyle} />
      <div ref={popoverRef} className="fixed bg-white rounded-lg shadow-2xl p-6 w-80" style={popoverStyle} >
        <div style={getArrowStyles()} />
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
            <CloseIcon className="w-6 h-6" />
        </button>
        <h3 className="font-bold font-heading text-lg mb-2">{currentStep.title}</h3>
        <p className="text-sm text-brand-text-secondary mb-4">{currentStep.content}</p>
        <div className="flex justify-between items-center">
            <span className="text-xs text-brand-text-secondary">{stepIndex + 1} / {tourSteps.length}</span>
            <div>
                {stepIndex > 0 && <Button variant="ghost" onClick={handlePrev} className="mr-2">Prev</Button>}
                <Button variant="primary" onClick={handleNext}>
                    {stepIndex === tourSteps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
