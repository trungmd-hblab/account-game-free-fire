'use client'
import React, { useEffect } from 'react';

const PluginFacebook = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.nonce = 'f0x1Wbt6';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div id="fb-root"></div>
            <div
                className="fb-page"
                data-href="https://www.facebook.com/profile.php?id=61561479104181"
                data-tabs="" data-width="280" data-height="180"
                data-small-header="false" data-adapt-container-width="false"
                data-hide-cover="false" data-show-facepile="false">
                <blockquote cite="https://www.facebook.com/profile.php?id=61561479104181" className="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/profile.php?id=61561479104181">CSKH Hùngakira</a>
                </blockquote>
            </div>
        </div>
    );
};

export default PluginFacebook;
