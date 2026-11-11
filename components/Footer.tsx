export default function Footer() {
  return (
    <footer id="contact" className="bg-peach mt-24 sm:mt-32">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 text-center">
        <p className="font-script text-3xl sm:text-4xl text-taupe mb-2">Ready to</p>
        <h2 className="font-display text-fluid-h2 text-umber">create memories?</h2>
        <a
          href="mailto:hello@marwahassan.com"
          className="inline-block mt-8 text-sm sm:text-base text-umber border-b border-umber/40 pb-1 hover:border-umber transition-colors"
        >
          hello@marwahassan.com
        </a>
        <div className="flex justify-center gap-6 font-sans text-sm text-umber/70 mt-10">
          <a href="#" className="hover:text-umber transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-umber transition-colors">
            Behance
          </a>
        </div>
      </div>
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-12 pb-6 text-center text-xs text-umber/60">
        © {new Date().getFullYear()} Marwa Hassan. All images reserved.
      </div>
    </footer>
  );
}
