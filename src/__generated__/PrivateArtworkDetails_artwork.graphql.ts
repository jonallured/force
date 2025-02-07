/**
 * @generated SignedSource<<3dbfed61302ba8ca2ce174983f3d6d42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkDetails_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork" | "PrivateArtworkAboutWork_artwork" | "PrivateArtworkMetadata_artwork">;
  readonly " $fragmentType": "PrivateArtworkDetails_artwork";
};
export type PrivateArtworkDetails_artwork$key = {
  readonly " $data"?: PrivateArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkDetails_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkDetails_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkAboutWork_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkAboutArtist_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkMetadata_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "4facb03839a4004c135b672287a97c0a";

export default node;
