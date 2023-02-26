const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-auto min-h-[6rem] text-white bg-[#111827] py-2 px-2 mt-5">
      <p className="text-base text-center tracking-wide">
        All Rights Reserved. Copyright © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
