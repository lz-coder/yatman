import Modal from "./Modal";
import TileManager from "./TileManager";

export default function TileViewer({ tile, closeCallback }) {
  return (
    <Modal
      title={tile.name}
      closeHandler={closeCallback}
      dialogClasses="md:max-w-6xl md:!w-full h-4/6"
    >
      <TileManager tilesStorage={tile.items} onGroup={true} groupItem={tile} />
    </Modal>
  );
}
