/**
 * @generated SignedSource<<f710ae537d6ead3777352db18d8dc874>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBidAction_me$data = {
  readonly isIdentityVerified: boolean | null | undefined;
  readonly pendingIdentityVerification: {
    readonly internalID: string;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarBidAction_me";
};
export type ArtworkSidebarBidAction_me$key = {
  readonly " $data"?: ArtworkSidebarBidAction_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBidAction_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBidAction_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isIdentityVerified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IdentityVerification",
      "kind": "LinkedField",
      "name": "pendingIdentityVerification",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4eac5f9eb500735074706d5aa4df2383";

export default node;
