/* eslint jsx-quotes: ["error", "prefer-double"] */
import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import util from './util';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export type MediaCardActionMap = {
  [index: string]: Function;
};
export type MediaCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  image?: any;
  onClick?: Function;
  footerActions?: MediaCardActionMap;
};

export default function MediaCard(props: MediaCardProps) {
  const {
    title, description, image, onClick, footerActions, children,
  } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => onClick && onClick()}>
        {image && (
          <CardMedia
            className={classes.media}
            image={image.url}
            title={title}
          />
        )}
        <CardContent>
          {title && (
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          )}

          {description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          )}

          {children && children}
        </CardContent>
      </CardActionArea>
      {footerActions && (
        <CardActions>
          {Object.keys(footerActions).map((key) => (
            <Button
              size="small"
              color="primary"
              onClick={() => footerActions![key]()}
            >
              {util.string.camelToSentenceCase(key)}
            </Button>
          ))}
        </CardActions>
      )}
    </Card>
  );
}
