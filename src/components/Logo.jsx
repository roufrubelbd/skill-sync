import React from 'react';
import { RiBrainFill } from 'react-icons/ri';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="text-info flex items-center gap-1"><RiBrainFill size={24}/><span className=" text-xl font-bold hidden md:block">SKILL SYNC</span></Link>
    );
};

export default Logo;