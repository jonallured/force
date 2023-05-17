/**
 * @generated SignedSource<<a2bb75bc62e629b15bf86636bf227788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_heroUnitsConnection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeContentCards_heroUnits">;
  readonly " $fragmentType": "HomeApp_heroUnitsConnection";
};
export type HomeApp_heroUnitsConnection$key = {
  readonly " $data"?: HomeApp_heroUnitsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeApp_heroUnitsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_heroUnitsConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeContentCards_heroUnits"
    }
  ],
  "type": "HeroUnitConnection",
  "abstractKey": null
};

(node as any).hash = "e45e7a0d238a9a9f88bb6b943d1732dc";

export default node;
