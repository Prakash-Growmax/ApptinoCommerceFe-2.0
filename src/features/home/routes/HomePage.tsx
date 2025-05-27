import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@components/atoms/Button/Button";
import { FeatureCard } from "../components/FeatureCard";

const HomePage = () => {
  const { t } = useTranslation();

  // Features to display
  const features = [
    {
      title: "Modern React",
      description:
        "Built with React 18, TypeScript, and the latest web standards.",
      icon: "🚀",
    },
    {
      title: "Performant",
      description:
        "Optimized for speed and user experience with code splitting and lazy loading.",
      icon: "⚡",
    },
    {
      title: "Scalable",
      description:
        "Feature-based architecture designed for large-scale applications.",
      icon: "📊",
    },
    {
      title: "International",
      description:
        "Comprehensive i18n solution built-in for global applications.",
      icon: "🌎",
    },
    {
      title: "Quality First",
      description:
        "Integrated testing and code quality tools for reliable applications.",
      icon: "✅",
    },
    {
      title: "Developer Experience",
      description: "Streamlined developer workflow with modern tooling.",
      icon: "👨‍💻",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="pb-16 pt-8 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          {t("app.title")}
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          {t("app.description")}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/auth/register">
            <Button size="lg">{t("auth.getStarted")}</Button>
          </Link>

          <Link to="/dashboard">
            <Button size="lg" variant="outline">
              {t("navigation.viewDemo")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          {t("home.features")}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold">{t("home.readyToStart")}</h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          {t("home.ctaDescription")}
        </p>

        <Link to="/auth/register">
          <Button size="lg">{t("auth.createAccount")}</Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
