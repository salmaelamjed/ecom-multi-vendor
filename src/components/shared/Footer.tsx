import { Input } from "@/components/ui/input"; // Composant Input de Chadcn
import { Button } from "@/components/ui/button"; // Composant Button de Chadcn

const Footer = () => {
  return (
    <footer className="p-10 mt-3 footer bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section Services */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Services</h6>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Branding
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Design
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Marketing
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Advertisement
          </a>
        </nav>

        {/* Section Company */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About us
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Jobs
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Press kit
          </a>
        </nav>

        {/* Section Legal */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Terms of use
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacy policy
          </a>
          <a className="link link-hover block mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Cookie policy
          </a>
        </nav>

        {/* Section Newsletter */}
        <form>
          <h6 className="footer-title text-lg font-semibold mb-4">Newsletter</h6>
          <fieldset className="form-control">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="username@site.com"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </footer>
  );
};

export default Footer;