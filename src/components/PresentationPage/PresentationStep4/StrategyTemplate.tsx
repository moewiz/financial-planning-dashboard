import React, { useEffect, useState } from 'react';
import { TemplateContent, TemplateWrapper, TemplateHeader } from './styled';
import { Skeleton } from 'antd';

interface StrategyTemplateProps {
  index: number;
}

const StrategyTemplate = (props: StrategyTemplateProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <TemplateWrapper>
      <Skeleton
        loading={loading}
        avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
        paragraph={{ rows: 2 }}
        active
      >
        <TemplateHeader>
          <img
            alt="Salary sacrifice"
            src={`http://sgp18.siteground.asia/~whistle4/images/1.svg`}
            style={{ height: 120 }}
            className="fadeIn"
          />
          <div className="header-body">
            <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
              Salary sacrifice
            </div>
            <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
              <b>John Samual,</b> salary sacrifice <b>$10,000 per annum</b> into <br />
              <b>CFS FirstChoice Wholesale Super</b> from <b>July 2019 to July 2023</b>
            </div>
          </div>
        </TemplateHeader>
      </Skeleton>
      <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
        <TemplateContent>
          <ul>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
            </li>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
              Printer took a galley of type of scrambled it to make a type specimen book. It has surviced not only five
              centuries, but also the leap into electronic typesetting, remaining essentially unchanged
            </li>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMarker
            </li>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2.75s' }}>
              Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
              in a piece of classical Latin literature from 45 BC, making it over 2000 years old
            </li>
          </ul>
        </TemplateContent>
      </Skeleton>
    </TemplateWrapper>
  );
};

export default StrategyTemplate;
