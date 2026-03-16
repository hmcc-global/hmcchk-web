import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOData } from './seoData';

const DynamicSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const updateSEO = () => {
      const { title, description, keywords } = getSEOData(location.pathname);

      // Update document title
      document.title = title;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = keywords;
        document.head.appendChild(metaKeywords);
      }

      // Update Open Graph title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      } else {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = title;
        document.head.appendChild(ogTitle);
      }

      // Update Open Graph description
      let ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      } else {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.content = description;
        document.head.appendChild(ogDescription);
      }

      // Update Open Graph URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      const currentUrl = `https://hongkong.hmcc.net${location.pathname}`;
      if (ogUrl) {
        ogUrl.setAttribute('content', currentUrl);
      } else {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.content = currentUrl;
        document.head.appendChild(ogUrl);
      }

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', currentUrl);
      } else {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = currentUrl;
        document.head.appendChild(canonical);
      }
    };

    updateSEO();
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default DynamicSEO;
