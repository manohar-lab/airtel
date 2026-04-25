import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, path, color = 'text-airtel-red' }) => {
  return (
    <Link
      to={path}
      id={`service-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="neo-card neo-card-hover p-6 flex flex-col items-center justify-center gap-4 text-center group"
    >
      <div className={`p-4 rounded-2xl neo-inset ${color} transition-all duration-300 group-hover:shadow-none group-hover:bg-airtel-red group-hover:text-white`}>
        <Icon size={30} strokeWidth={1.8} />
      </div>
      <div>
        <span className="font-bold text-gray-800 group-hover:text-airtel-red transition-colors text-sm">
          {title}
        </span>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default ServiceCard;
