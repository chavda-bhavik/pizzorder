import React from 'react';
import classNames from 'classnames';

interface ContentProps {
    title: string;
    children?: string;
}

interface DividedContentProps {
    children: React.ReactElement<ContentProps>[];
    className?: string;
}

export const DividedContent: React.FC<DividedContentProps> = ({ children, className }) => {
    let len = React.Children.count(children);
    return (
        <div className={classNames('space-y-1', className)}>
            {React.Children.map(children, (child: React.ReactElement<ContentProps>, i) => {
                if (i === len - 1 && child.props.title) {
                    // rendering last highlighted content
                    return (
                        <>
                            <hr />
                            <div className="flex justify-between text-lg font-archivo-semibold px-1">
                                <p>{child.props.title}</p>
                                <p>{child.props.children}</p>
                            </div>
                        </>
                    );
                } else if (child!.props!.title) {
                    // rendering normal content
                    return (
                        <div className="flex justify-between px-1">
                            <p className="font-archivo-light">{child.props.title}</p>
                            <p className="font-archivo-semibold">{child.props.children}</p>
                        </div>
                    );
                } else return null;
            })}
        </div>
    );
};
