const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-16 border-t">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} TenantHub. All rights reserved.
      </p>
      <div className="mt-2 space-x-4">
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        <a href="#" className="text-blue-600 hover:underline">Terms</a>
        <a href="#" className="text-blue-600 hover:underline">Support</a>
      </div>
    </footer>
  );
};

export default Footer;
