function LoadingScreen() {
    return (
        <main className="loading-screen" aria-live="polite" aria-busy="true">
            <div className="loading-spinner" aria-hidden="true" />
            <p className="loading-message">Loading page...</p>
        </main>
    );
}

export default LoadingScreen;