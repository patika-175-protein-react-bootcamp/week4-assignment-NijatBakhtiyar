function CorrectIcon({ params }) {
    return (
        <svg width={params?.width || 20} height={params?.height || 25} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18.5819C5.35296 21.3546 8.61406 24.1982 11.347 27.6144C12.5477 29.1152 12.052 29.6937 13.2344 26.8504C17.0954 17.5655 20.3179 8.28124 28.6929 2" stroke={params?.color || "#FF0000"} strokeWidth="3" strokeLinecap="round" />
        </svg>

    );
};

export default CorrectIcon;


