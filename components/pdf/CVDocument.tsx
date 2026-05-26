import type { PerfilData, TemplateId } from "./shared/pdfTypes";
import { ClassicTemplate }       from "./templates/ClassicTemplate";
import { ExecutiveTemplate }     from "./templates/ExecutiveTemplate";
import { TechTemplate }          from "./templates/TechTemplate";
import { MinimalTemplate }       from "./templates/MinimalTemplate";
import { CompactTemplate }       from "./templates/CompactTemplate";
import { InternationalTemplate } from "./templates/InternationalTemplate";
import { CreativeTemplate }      from "./templates/CreativeTemplate";

type Props = { perfil: PerfilData; templateId?: TemplateId };

const TEMPLATES: Record<TemplateId, React.FC<{ perfil: PerfilData }>> = {
  clasica:       ClassicTemplate,
  ejecutiva:     ExecutiveTemplate,
  tech:          TechTemplate,
  minimalista:   MinimalTemplate,
  compacta:      CompactTemplate,
  internacional: InternationalTemplate,
  creativa:      CreativeTemplate,
};

export function CVDocument({ perfil, templateId = "clasica" }: Props) {
  const Template = TEMPLATES[templateId] ?? ClassicTemplate;
  return <Template perfil={perfil} />;
}
