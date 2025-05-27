import { HTMLAttributes } from 'react';

interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
  ...props
}: FeatureCardProps) => {
  return (
    <div
      className={`flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md ${className}`}
      {...props}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
