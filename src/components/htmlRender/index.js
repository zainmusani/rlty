import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const HtmlRender = (props) => {
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
            contentWidth={width}
            source={props.source}
        />
    );
};

export default HtmlRender;