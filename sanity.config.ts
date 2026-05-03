"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";

/**
 * All singleton page documents.
 * Each entry: [schemaType, display title, icon emoji]
 */
const PAGE_SINGLETONS = [
  { type: "homePage", title: "🏠 Homepage" },
  { type: "aboutPage", title: "👥 About" },
  { type: "leadershipPage", title: "👔 Leadership" },
  { type: "securityPage", title: "🔒 Security" },
  { type: "vipPage", title: "⭐ VIP" },
  { type: "careersPage", title: "💼 Careers" },
  { type: "webshopPage", title: "🛍️ Webshop" },
  { type: "faqPage", title: "❓ FAQ" },
  { type: "aiAssistantPage", title: "🤖 AI Assistant" },
  { type: "helpCenterPage", title: "📚 Help Center" },
] as const;

export default defineConfig({
  name: "default",
  title: "EventPartner",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items(
            PAGE_SINGLETONS.map((page) =>
              S.listItem()
                .title(page.title)
                .id(page.type)
                .child(
                  S.document()
                    .schemaType(page.type)
                    .documentId(page.type)
                )
            )
          ),
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        mainDocuments: [
          {
            route: "/",
            filter: `_type == "homePage"`,
          },
        ],
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating new instances of singleton page types
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !PAGE_SINGLETONS.some((p) => p.type === schemaType)
      ),
  },
});
