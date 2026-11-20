import { useStyletron } from "baseui";
import { Button, KIND, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import type { ApiWhatsAppTemplate } from "../../../api";

interface Props {
	templates: ApiWhatsAppTemplate[];
	setTemplates: (templates: ApiWhatsAppTemplate[]) => void;
	onSave: () => Promise<void>;
	saving: boolean;
	t: (key: string) => string;
	surface?: "card" | "list";
}

export default function WhatsAppTemplatesSection({
	templates,
	setTemplates,
	onSave,
	saving,
	t,
	surface = "card",
}: Props) {
	const [css] = useStyletron();
	const isList = surface === "list";

	const handleAdd = () => {
		setTemplates([
			...templates,
			{
				id: `tpl-${Date.now()}`,
				title: "",
				message: "",
			},
		]);
	};

	const handleRemove = (id: string) => {
		setTemplates(templates.filter((tpl) => tpl.id !== id));
	};

	const handleUpdate = (
		id: string,
		field: "title" | "message",
		value: string,
	) => {
		setTemplates(
			templates.map((tpl) =>
				tpl.id === id ? { ...tpl, [field]: value } : tpl,
			),
		);
	};

	return (
		<div
			className={css({
				backgroundColor: "var(--color-bg-secondary)",
				borderRadius: isList ? "10px" : "12px",
				padding: isList ? "18px" : "24px",
				border: "1px solid var(--color-bg-quaternary)",
			})}
		>
			<h2
				className={css({
					fontSize: "18px",
					fontWeight: 700,
					color: "var(--color-text-primary)",
					marginBottom: "8px",
				})}
			>
				{t("settings.whatsappTemplates")}
			</h2>
			<p
				className={css({
					fontSize: "13px",
					color: "var(--color-text-secondary)",
					marginBottom: "6px",
				})}
			>
				{t("settings.whatsappTemplatesDescription")}
			</p>
			<p
				className={css({
					fontSize: "12px",
					color: "var(--color-text-tertiary)",
					marginBottom: "16px",
				})}
			>
				{t("settings.whatsappTemplatesVariables")}
			</p>

			<div className={css({ display: "grid", gap: "12px", marginBottom: "14px" })}>
				{templates.map((tpl) => (
					<div
						key={tpl.id}
						className={css({
							padding: "14px",
							borderRadius: "8px",
							backgroundColor: "var(--color-bg-tertiary)",
							border: "1px solid var(--color-bg-quaternary)",
							display: "grid",
							gap: "8px",
						})}
					>
						<div
							className={css({
								display: "flex",
								gap: "8px",
								alignItems: "center",
							})}
						>
							<div className={css({ flex: 1 })}>
								<FormControl label={t("settings.whatsappTemplateTitle")}>
									<Input
										value={tpl.title}
										placeholder={t("settings.whatsappTemplateTitlePlaceholder")}
										onChange={(e) =>
											handleUpdate(tpl.id, "title", e.currentTarget.value)
										}
									/>
								</FormControl>
							</div>
							<Button
								type="button"
								kind={KIND.tertiary}
								size={SIZE.compact}
								onClick={() => handleRemove(tpl.id)}
							>
								{t("slots.delete")}
							</Button>
						</div>
						<FormControl label={t("settings.whatsappTemplateMessage")}>
							<Textarea
								value={tpl.message}
								placeholder={t("settings.whatsappTemplateMessagePlaceholder")}
								onChange={(e) =>
									handleUpdate(tpl.id, "message", e.currentTarget.value)
								}
							/>
						</FormControl>
					</div>
				))}
			</div>

			<div className={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
				<Button
					type="button"
					kind={KIND.secondary}
					size={SIZE.compact}
					onClick={handleAdd}
				>
					{t("settings.whatsappAddTemplate")}
				</Button>
				<Button
					type="button"
					size={SIZE.compact}
					isLoading={saving}
					onClick={onSave}
				>
					{t("settings.whatsappSaveTemplates")}
				</Button>
			</div>
		</div>
	);
}
