import gsap from 'gsap';

export const useDeemOverlay = (key: string) => {
  const createDeemOverlay = (func: () => void) => {
    const $deemOverlay = document.createElement('div');
    $deemOverlay.classList.add('deem-overlay');
    $deemOverlay.setAttribute('data-key', key);
    document.body.appendChild($deemOverlay);
    
    gsap.to($deemOverlay, {
      duration: 0.3,
      opacity: 1,
      ease: 'power2.inOut'
    })
    
    // 딤 오버레이 클릭 이벤트 리스너 추가
    $deemOverlay.addEventListener('click', func);
  }

  const removeDeemOverlay = () => {
    const $deemOverlay = document.querySelector(`.deem-overlay[data-key="${key}"]`);
    if($deemOverlay){
      gsap.to($deemOverlay, {
        duration: 0.3,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          $deemOverlay.remove();
        }
      })
    }
  }

  return {
    createDeemOverlay,
    removeDeemOverlay
  }
} 