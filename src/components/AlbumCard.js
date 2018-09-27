import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Text from "./Text";
import variables from "../styles/variables";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { screenWidth } from "../constants";

const INNER_PADDING = 20;
const OUTER_MARGIN = 20;

const AlbumCard = ({ album, index, navigation, settings, onPrintPressed }) => (
  <View
    style={{
      justifyContent: "center",
    }}
  >
    <View
      style={{
        position: "relative",
        width: screenWidth - 2 * OUTER_MARGIN - INNER_PADDING - 10,
        marginLeft: OUTER_MARGIN,
        marginRight: index === 0 ? OUTER_MARGIN : 0,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: variables.dividerColor,
          backgroundColor: variables.mainBgColor,
          padding: INNER_PADDING,
          marginBottom: 20,
          elevation: 4,
          shadowColor: "black",
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}
      >
        <Text>{`Created: ${album.created_at}`}</Text>
        <Text>{`Status: ${album.status.display_name}`}</Text>
        <Text>{`Photos: ${album.photos.length}/ ${settings.max_photo_count}`}</Text>
        <ProgressBar
          progress={album.photos.length / settings.max_photo_count}
          threshold={settings.min_photo_count / settings.max_photo_count}
        />
      </View>

      <View>
        {!album.ordered &&
          (album.photos.length < settings.max_photo_count && (
            <Button
              title="Add photos"
              onPress={() =>
                navigation.navigate("AlbumPhotoSelect", {
                  albumId: album.id,
                })
              }
            />
          ))}

        {!album.ordered &&
          (album.photos.length >= settings.min_photo_count && (
            <Button
              title="Print now"
              onPress={onPrintPressed}
              containerStyle={{
                marginTop: 10,
              }}
            />
          ))}
      </View>
    </View>
  </View>
);

AlbumCard.propTypes = {
  album: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  settings: PropTypes.shape({}).isRequired,
  onPrintPressed: PropTypes.func.isRequired,
};

export default AlbumCard;
