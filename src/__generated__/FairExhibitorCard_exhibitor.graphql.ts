/**
 * @generated SignedSource<<7dca246ae0c7a3af754698d94789cd03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_exhibitor$data = {
  readonly partner: {
    readonly internalID: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
  } | null | undefined;
  readonly profileID: string | null | undefined;
  readonly " $fragmentType": "FairExhibitorCard_exhibitor";
};
export type FairExhibitorCard_exhibitor$key = {
  readonly " $data"?: FairExhibitorCard_exhibitor$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorCard_exhibitor">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorCard_exhibitor",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderPartner_partner"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairExhibitor",
  "abstractKey": null
};

(node as any).hash = "117da6dd1e9b1be9e5b6ba89e8baf624";

export default node;
