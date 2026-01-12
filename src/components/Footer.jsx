import React from "react";
import Logo from "./Logo";
import { Link } from "react-router";
import { MdHome } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content grid-rows-2 p-10">
      <nav>
        <Logo />
        <p>
          Skill Sync Ltd.
          <br />
          Providing reliable tech since 2024
        </p>
        <Link to="/" className="link link-hover flex items-center gap-1">
          <MdHome size={16} />
          <span className="">Back Home</span>
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a href="about" className="link link-hover">About us</a>
        <a href="contact" className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav>
        <h6 className="footer-title">Social</h6>
        <a className="link link-hover flex items-center justify-start gap-1">
          <FaXTwitter />
          Twitter
        </a>
        <a className="link link-hover flex items-center justify-start gap-1">
          {" "}
          <FaInstagram />
          Instagram
        </a>
        <a className="link link-hover flex items-center justify-start gap-1">
          {" "}
          <FaSquareFacebook />
          Facebook
        </a>
        <a className="link link-hover flex items-center justify-start gap-1">
          <FaGithub /> GitHub
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Explore</h6>
        <a className="link link-hover">Features</a>
        <a className="link link-hover">Enterprise</a>
        <a className="link link-hover">Security</a>
        <a className="link link-hover">Pricing</a>
      </nav>
      <nav>
        <h6 className="footer-title">Apps</h6>
        <a className="link link-hover">Mac</a>
        <a className="link link-hover">Windows</a>
        <a className="link link-hover">iPhone</a>
        <a className="link link-hover">Android</a>
      </nav>
    </footer>
  );
};

export default Footer;
