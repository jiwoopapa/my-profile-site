// JavaScript 인터랙션

// DOM 요소 선택
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const darkModeToggle = document.getElementById('darkModeToggle');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');
const copyFeedback = document.getElementById('copyFeedback');

// 1. 네비게이션 바 스크롤 효과
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 현재 섹션 하이라이트
    highlightActiveSection();
});

// 2. 현재 섹션 하이라이트
function highlightActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 3. 스무스 스크롤
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 네비게이션 높이 고려

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 4. 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 모든 fade-in 요소 관찰
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// 5. 다크모드 토글
function initDarkMode() {
    // localStorage에서 다크모드 설정 가져오기
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
});

// 페이지 로드 시 다크모드 초기화
initDarkMode();

// 6. 이메일 복사 기능
copyEmailBtn.addEventListener('click', async () => {
    const email = emailText.textContent;

    try {
        // 클립보드에 복사
        await navigator.clipboard.writeText(email);

        // 피드백 표시
        copyFeedback.classList.remove('hidden');
        copyEmailBtn.innerHTML = '<i class="fas fa-check"></i><span>복사됨!</span>';
        copyEmailBtn.classList.add('bg-green-600');
        copyEmailBtn.classList.remove('bg-blue-600');

        // 3초 후 원래 상태로 복구
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
            copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i><span>복사</span>';
            copyEmailBtn.classList.remove('bg-green-600');
            copyEmailBtn.classList.add('bg-blue-600');
        }, 3000);

    } catch (err) {
        console.error('복사 실패:', err);
        alert('이메일 복사에 실패했습니다. 수동으로 복사해주세요.');
    }
});

// 7. 모바일 메뉴 토글 (추후 확장 가능)
// 현재는 데스크톱 메뉴만 구현, 필요시 햄버거 메뉴 추가 가능

// 8. 페이지 로드 시 초기 애니메이션
window.addEventListener('load', () => {
    // 첫 화면의 fade-in 요소들 즉시 표시
    const heroElements = document.querySelectorAll('#home .fade-in');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100);
    });
});

// 9. 외부 링크 처리 (새 탭에서 열기)
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// 10. 스크롤 시 요소 애니메이션 추가
function addScrollAnimation() {
    const scrollElements = document.querySelectorAll('.fade-in');

    scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', addScrollAnimation);

// 콘솔 환영 메시지
console.log('%c👋 안녕하세요!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c개발자 도구를 열어보셨네요! 함께 일하고 싶으시다면 abc@gmail.com으로 연락주세요.', 'font-size: 14px; color: #6b7280;');
