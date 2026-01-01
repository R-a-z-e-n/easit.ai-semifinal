import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage.tsx';
import ChatApp from './ChatApp.tsx';
import { AuthPage } from './components/AuthPage.tsx';
import { useTheme } from './hooks/useTheme.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import type { User } from './types.ts';
import { websocketService } from './services/websocketService.ts';

const App: React.FC = () => {
    const [user, setUser] = useLocalStorage<User | null>('easit-user', null);
    const [jwt, setJwt] = useLocalStorage<string | null>('easit-jwt', null);
    const [authVisible, setAuthVisible] = useState(false);
    
    useTheme();

    useEffect(() => {
        if (jwt && jwt !== 'guest-demo-token') {
            websocketService.connect(jwt);
        } else {
            websocketService.disconnect();
        }

        return () => {
            websocketService.disconnect();
        };
    }, [jwt]);

    const handleSignOut = () => {
        setUser(null);
        setJwt(null);
    };

    const handleGuestLogin = () => {
        const guestUser: User = {
            name: "Easit Guest",
            email: "guest@solveearn.com",
            picture: undefined
        };
        setUser(guestUser);
        setJwt("guest-demo-token");
    };

    if (user && jwt) {
        return <ChatApp user={user} onSignOut={handleSignOut} />;
    }
    
    if (authVisible) {
        return <AuthPage 
            onLoginSuccess={(newUser, token) => {
                setUser(newUser);
                setJwt(token);
            }} 
            onGoBack={() => setAuthVisible(false)} 
        />;
    }

    return <LandingPage 
        onGetStarted={() => setAuthVisible(true)} 
        onEnterAsGuest={handleGuestLogin}
    />;
};

export default App;