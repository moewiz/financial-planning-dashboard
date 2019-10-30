import React from 'react';
import { TemplateContent, TemplateWrapper, TemplateHeader } from './styled';

interface StrategyTemplateProps {
  index: number;
}

const StrategyTemplate = (props: StrategyTemplateProps) => {
  return (
    <TemplateWrapper>
      <TemplateHeader>
        <img
          alt="Salary sacrifice"
          src={`http://sgp18.siteground.asia/~whistle4/images/1.svg`}
          style={{ height: 120 }}
        />
        <div className="header-body">
          <div className="header-body--title">Salary sacrifice</div>
          <div className="header-body--content">
            <b>John Samual,</b> salary sacrifice <b>$10,000 per annum</b> into <br />
            <b>CFS FirstChoice Wholesale Super</b> from <b>July 2019 to July 2023</b>
          </div>
        </div>
      </TemplateHeader>
      <TemplateContent>
        <ul>
          <li>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
          </li>
          <li>
            Printer took a galley of type of scrambled it to make a type specimen book. It has surviced not only five
            centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </li>
          <li>
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMarker
          </li>
          <li>
            Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
            a piece of classical Latin literature from 45 BC, making it over 2000 years old
          </li>
        </ul>
      </TemplateContent>
    </TemplateWrapper>
  );
};

export default StrategyTemplate;
