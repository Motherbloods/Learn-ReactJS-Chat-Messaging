function Container({ children }) {
    return (
        <>
            <div>
                <h1>Haloo Ini adalah container</h1>
            </div>
            {children}
            <footer>
                <h2>ini adalah foofter kamirrr</h2>
            </footer>
        </>
    );
}

export default Container;