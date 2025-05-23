export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-2 sm:py-4">
      <h2 className="text-center text-md lg:text-xl font-bold mb-4 text-primary">
        Built with ❤️ at
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        <div className="flex items-center gap-1 text-muted-foreground/60">
          <img
            src="/eth-bratislava.avif"
            alt="eth bratislava logo"
            className="h-20"
          />
        </div>
      </div>
    </section>
  );
};
