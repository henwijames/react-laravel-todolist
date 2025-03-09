import React from "react";
import reactLogo from "@public/assets/images/react.png";
import laravelLogo from "@public/assets/images/laravel.png";

const Logo = () => {
    return (
        <div className="flex justify-center items-center gap-3 mb-2 min-h-[40px]">
            <img
                src={reactLogo}
                alt="React"
                className="max-w-[40px] max-h-[40px]"
                loading="lazy"
            />
            <img
                src={laravelLogo}
                alt="Laravel"
                className="max-w-[40px] max-h-[40px]"
                loading="lazy"
            />
            <p className="font-semibold">TODO LIST</p>
        </div>
    );
};

export default Logo;
